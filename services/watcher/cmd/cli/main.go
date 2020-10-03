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
	// 	Name: "test",
	// 	Source: &v1.Source{
	// 		Url:      "https://asic.gov.au",
	// 		Adapter:  "asic",
	// 		Format:   v1.DocumentFormat_CSV,
	// 		Interval: &interval,
	// 	},
	// })
	w.ListWatchers(ctx, &v1.ListWatchersRequest{})
	defer zap.L().Sync()
}
