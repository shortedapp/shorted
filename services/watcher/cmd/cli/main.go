package main

import (
	"context"
	"fmt"
	"os"

	"github.com/shortedapp/shorted/services/watcher/internal/service/watcher"
	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/shorted/service/watcher/v1"
	"go.uber.org/zap"
)

var (
	logger *zap.SugaredLogger
)

func main() {
	cfg := &config.Config{
		ProjectId:      os.Getenv("PROJECT_ID"),
		LoggingEncoder: os.Getenv("LOGGING_ENCODER"),
	}

	logger = zap.S().With("watcher", "cmd")
	ctx := context.Background()
	w, err := watcher.New(ctx, cfg)
	if err != nil {
		panic(fmt.Errorf("failed initialising watch: %v", err))
	}
	// interval := 60 * time.Minute
	// w.CreateWatcher(ctx, &v1.CreateWatcherRequest{
	// 	Watch: &v1.WatcherDetails{
	// 		Metadata: &v1.Metadata{
	// 			Name: "test",
	// 		},
	// 		Spec: &v1.Spec{
	// 			Source: &v1.Source{
	// 				Url:      "https://asic.gov.au",
	// 				Adapter:  "asic",
	// 				Format:   v1.DocumentFormat_CSV,
	// 				Interval: &interval,
	// 			},
	// 		},
	// 	},
	// })
	// w.ListWatchers(ctx, &v1.ListWatchersRequest{})
	// watcher, err := w.DeleteWatcher(ctx, &v1.DeleteWatcherRequest{
	// 	Id: "dbfef2e7-8648-42d3-98cc-9adcae8b43d6",
	// })
	id := "28f6edfc-7361-4b37-9e36-65814667e9b4"
	_, err = w.GetWatcher(ctx, &v1.GetWatcherRequest{
		Id: id,
	})
	if err != nil {
		panic(err)
	}
	resp, err := w.SyncWatcher(ctx, &v1.SyncWatcherRequest{
		Id: id,
	})
	if err != nil {
		panic(fmt.Errorf("error syncing watcher %v, error: %v", id, err))
	}
	fmt.Printf("resp: %v", resp)
	defer zap.L().Sync()
}
