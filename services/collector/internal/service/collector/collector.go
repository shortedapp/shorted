package collector

import (
	"bufio"
	"bytes"
	"context"
	"crypto/sha256"
	"encoding/csv"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/shortedapp/shorted/services/collector/pkg/config"
	"github.com/shortedapp/shorted/services/collector/pkg/log"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/collector/v1"
)

type Service struct {
	Config *config.Config
}

func New(ctx context.Context, cfg *config.Config) (*Service, error) {
	log.InitLogger(cfg)
	var s Service
	s.Config = cfg
	return &s, nil
}

// GetSource information about a specific configured Watch
func (s *Service) GetSource(ctx context.Context, in *v1.GetSourceRequest) (*v1.GetSourceResponse, error) {
	result, err := getSource(ctx, in.Url, in.Format)
	if err != nil {
		return &v1.GetSourceResponse{}, fmt.Errorf("unable to fetch source %s, error: %v", in.Url, err)
	}
	return &v1.GetSourceResponse{Result: result}, nil
}

func getSource(ctx context.Context, url string, format v1.Format, parser v1.Parser) (*v1.SourceDetails, error) {
	
	
	response, err := http.Get(url)
	if err != nil {
		log.Errorf("unable to fetch contents for url %s", url)
		return nil, err
	}
	log.Response(ctx, response)
	b, _ := ioutil.ReadAll(response.Body)
	reader := bufio.NewReader(bytes.NewReader(b))
	count := 0
	var data []byte
	hash := sha256.New()
	switch format {
	case v1.Format_CSV:
		r := csv.NewReader(bytes.NewReader(b))
		r.FieldsPerRecord = -1
		r.Comma = '\t'
		for {
			line, err := reader.ReadBytes('\n')
			_, validationErr := r.Read()
			if err == io.EOF || validationErr == io.EOF {
				break
			}
			if validationErr != nil {
				log.Infof(ctx, "skipping invalid row: %s, error: %s", string(line), validationErr)
				continue
			}
			data = append(data, line...)
			count++
		}
		log.Infof(ctx, "processed %d rows", count)
		hash.Write(data)
		return &v1.SourceDetails{
			Source: &v1.Source{
				Url:    url,
				Format: format,
			},
			Metadata: &v1.SourceMetadata{
				Digest:  string(hash.Sum(nil)),
				Headers: getHeaders(response),
				Size_:   response.ContentLength,
			},
		}, nil
	default:
		log.Errorf("invalid format: %v", format)
		return nil, fmt.Errorf("invalid format specified: %v", format)
	}
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
