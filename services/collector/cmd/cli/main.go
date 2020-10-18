package main

import (
	"context"
	"fmt"
	"os"

	"github.com/shortedapp/shorted/services/collector/internal/service/collector"
	"github.com/shortedapp/shorted/services/collector/pkg/config"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/collector/v1"
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
	c, err := collector.New(ctx, cfg)
	if err != nil {
		panic(fmt.Errorf("failed initialising collector: %v", err))
	}
	source := "https://asic.gov.au/Reports/Daily/2010/06/RR20100616-001-SSDailyAggShortPos.csv"
	resp, err := c.GetSource(ctx, &v1.GetSourceRequest{
		Url:    source,
		Format: v1.Format_CSV,
	})
	if err != nil {
		panic(fmt.Errorf("error fetching from source: %v, error: %v", source, err))
	}

	fmt.Printf("resp: %v", resp)

	defer zap.L().Sync()
}
