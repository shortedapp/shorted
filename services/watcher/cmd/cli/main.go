package main

import (
	"context"
	"os"

	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	"github.com/shortedapp/shorted/services/watcher/pkg/watcher"
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
	log.InitLogger(cfg)
	logger = zap.S().With("watcher", "cmd")
	ctx := context.Background()
	w := watcher.New(ctx, cfg)
	w.Parse()
	w.Difference()
	defer zap.L().Sync()
}
