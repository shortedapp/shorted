package main

import (
	"context"
	"fmt"
	"os"

	"github.com/shortedapp/shorted/services/watcher/internal/service/watcher"
	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"go.uber.org/zap"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
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
	w.CreateWatcher(v1.CreateWatcherRequest{
		Name: "test",
		Source: &v1.Source{
			Url: "https://asic.gov.au",
			Adapter: "asic",
			Format: v1.DocumentFormat_CSV,
			Interval: "60m",
		},
	})
	defer zap.L().Sync()
}
