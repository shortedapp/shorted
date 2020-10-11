package collector

import (
	"context"

	"github.com/shortedapp/shorted/services/collector/pkg/config"
	"github.com/shortedapp/shorted/services/collector/pkg/log"
	// v1 "github.com/shortedapp/shorted/shortedapis/pkg/collector/v1"
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

// GetWatch information about a specific configured Watch
// func (s *Service) GetSource(ctx context.Context, in *v1.Get) (*v1.GetWatcherResponse, error) {
// 	watcher, err := w.store.Get(in.Id)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &v1.GetWatcherResponse{
// 		Watch: watcher}, nil
// }
