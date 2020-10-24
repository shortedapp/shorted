package collector

import (
	"context"
	"fmt"
	"net/http"
	"net/url"
	"crypto/sha256"

	"github.com/shortedapp/shorted/services/collector/parsers"
	"github.com/shortedapp/shorted/services/collector/pkg/clients/blob"
	"github.com/shortedapp/shorted/services/collector/pkg/config"
	"github.com/shortedapp/shorted/services/collector/pkg/log"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/collector/v1"
)

type Service struct {
	Config *config.Config
	blob   *blob.Blob
}

func New(ctx context.Context, cfg *config.Config) (svc *Service, err error) {
	log.InitLogger(cfg)
	svc = &Service{}
	svc.Config = cfg
	svc.blob, err = blob.New(ctx, cfg.Bucket)
	if err != nil {
		return svc, err
	}
	return svc, nil
}

// GetSource information about a specific configured Watch
func (s *Service) GetSource(ctx context.Context, in *v1.GetSourceRequest) (*v1.GetSourceResponse, error) {
	result, err := s.getSource(ctx, in.Url, in.Format, in.Parser)
	if err != nil {
		return &v1.GetSourceResponse{}, fmt.Errorf("unable to fetch source %s, error: %v", in.Url, err)
	}
	return &v1.GetSourceResponse{Result: result}, nil
}

func (s *Service) getSource(ctx context.Context, uri string, format v1.Format, name v1.Parser) (*v1.SourceDetails, error) {
	h := sha256.New()
	response, err := http.Get(uri)
	if err != nil {
		log.Errorf("unable to fetch contents for url %s", uri)
		return nil, err
	}
	log.Response(ctx, response)
	p, err := parsers.GetParser(name.String())
	if err != nil {
		return nil, fmt.Errorf("failed to get parser %v, error: %v", name.String(), err)
	}
	handler, err := p.NewBuilder().Build()
	if err != nil {
		return nil, fmt.Errorf("failed to build handler, error: %v", err)
	}
	count, data, err := handler.Parse(ctx, response.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to parse data: %v", err)
	}
	digest := fmt.Sprintf("%x", h.Sum(nil))
	metadata := &v1.SourceMetadata{
		Digest: digest,
		Size_: int64(count),
		Headers: getHeaders(response),
	}
	u, err := url.Parse(uri)
	if err != nil {
		return nil, fmt.Errorf("failed to parse uri: %v, error: %v", uri, err)
	}
	h.Write(data)
	err = s.blob.BucketWrite(ctx, u.Path, data, metadata)
	if err != nil {
		return nil, fmt.Errorf("failed to write to bucket: %v", err)
	}
	
	return &v1.SourceDetails{
		Source: &v1.Source{
			Url: uri,
			Format: format,
			Parser: name,
		},
		Metadata: metadata,
	}, nil
}

func getHeaders(r *http.Response) (headers map[string]string) {
	headers = make(map[string]string)
	for key, val := range r.Header {
		for _, value := range val {
			headers[key] = value
		}
	}
	return
}
