package main

import (
	"context"
	"fmt"
	"os"

	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	
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
	
	logger = zap.S().With("watcher", "cmd")
	ctx := context.Background()
	w, err := watcher.New(ctx, cfg)
	if err != nil {
		panic(fmt.Errorf("failed initialising watch: %v", err))
	}
	w.Parse()
	w.Difference()
	defer zap.L().Sync()
}
