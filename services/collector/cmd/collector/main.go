package main

import (
	"os"

	"github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/shortedapp/shorted/services/collector"
	"github.com/shortedapp/shorted/services/collector/pkg/config"
	"github.com/shortedapp/shorted/services/collector/pkg/log"
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
	logger = zap.S().With("collector", "cmd")
	funcframework.RegisterHTTPFunction("/", collector.Collect)
	// Use PORT environment variable, or default to 8080.
	port := "8080"
	if envPort := os.Getenv("PORT"); envPort != "" {
		port = envPort
	}

	if err := funcframework.Start(port); err != nil {
		log.Fatalf("funcframework.Start: %v\n", err)
	}
	defer zap.L().Sync()
}
