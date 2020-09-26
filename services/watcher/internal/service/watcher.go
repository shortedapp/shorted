package service

import (
	"context"
	"fmt"
	"os"

	"github.com/shortedapp/shorted/services/watcher/pkg/store"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
)

// validate WatchService implements v1.WatchServiceServer
// var _ v1.WatchServiceServer = (*WatchService)(nil)

type WatchService struct {
	store *store.Index
}

func New() (*WatchService, error) {
	bucket, ok := os.LookupEnv("WATCHER_BUCKET")
	if !ok {
		return nil, fmt.Errorf("no bucket name specified in config")
	}
	store, err := store.New(bucket)
	if err != nil {
		return nil, err
	}
	return &WatchService{
		store: store,
	}, nil
}

// GetWatch information about a specific configured Watch
func (w *WatchService) GetWatch(ctx context.Context, in *v1.GetWatcherRequest) (*v1.GetWatcherResponse, error) {
	_, err := w.store.Get(in.Id)
	if err != nil {
		return nil, err
	}
	return &v1.GetWatcherResponse{
		Watch: &v1.WatcherDetails{}}, nil
}
