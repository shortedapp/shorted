package service

import (
	"context"

	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
)

type WatchService struct {
}

func New() *WatchService {
	return &WatchService{}
}

// GetWatch information about a specific configured Watch
func (*WatchService) GetWatch(ctx context.Context, in *v1.GetWatchRequest) (*v1.Watch, error) {
	return &v1.Watch{
		Source: &v1.Source{
			Name: "example",
			Url:  "localhost.example",
		},
	}, nil
}
