package main

import (
	"context"
	"fmt"
	"os"

	"github.com/shortedapp/shorted/services/watcher/internal/service/watcher"
	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
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
	watcher, err := w.DeleteWatcher(ctx, &v1.DeleteWatcherRequest{
		Id: "dbfef2e7-8648-42d3-98cc-9adcae8b43d6",
	})
	if err != nil {
		panic(err)
	}
	fmt.Printf("watcher: %v", watcher)
	defer zap.L().Sync()
}
