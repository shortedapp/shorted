package collector

import (
	"context"
	"crypto/sha256"
	"fmt"
	"net/http"
	"net/url"

	"github.com/shortedapp/shorted/services/collector/parsers"
	"github.com/shortedapp/shorted/services/collector/pkg/clients/blob"
	"github.com/shortedapp/shorted/services/collector/pkg/config"
	"github.com/shortedapp/shorted/services/collector/pkg/log"
	collectorpb "github.com/shortedapp/shorted/shortedapis/pkg/shorted/service/collector/v1"
	shortedpb "github.com/shortedapp/shorted/shortedapis/pkg/shorted/api/v1"
)

type Service struct {
	Config *config.Config
	blob   *blob.Blob
	// Embed the unimplemented server
	collectorpb.UnimplementedCollectorServiceServer
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
func (s *Service) GetSource(ctx context.Context, in *collectorpb.GetSourceRequest) (*collectorpb.GetSourceResponse, error) {
	result, err := s.getSource(ctx, in.Url, in.Format, in.Parser)
	if err != nil {
		return &collectorpb.GetSourceResponse{}, fmt.Errorf("unable to fetch source %s, error: %v", in.Url, err)
	}
	return &collectorpb.GetSourceResponse{Result: result}, nil
}

func (s *Service) getSource(ctx context.Context, uri string, format shortedpb.Format, name shortedpb.Parser) (*collectorpb.SourceDetails, error) {
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
	metadata := &collectorpb.SourceMetadata{
		Digest: digest,
		Size: int64(count),
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
	
	return &collectorpb.SourceDetails{
		Source: &shortedpb.Source{
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
