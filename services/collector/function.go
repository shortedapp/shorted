package collector

import (
	"net/http"
	"os"

	"github.com/shortedapp/shorted/services/collector/pkg/collector"
	"github.com/shortedapp/shorted/services/collector/pkg/config"
	"github.com/shortedapp/shorted/services/collector/pkg/log"
	"go.uber.org/zap"
)

var (
	cfg    *config.Config
	logger *zap.SugaredLogger
)

func init() {
	cfg = &config.Config{
		ProjectId:      os.Getenv("PROJECT_ID"),
		LoggingEncoder: os.Getenv("LOGGING_ENCODER"),
	}
	log.InitLogger(cfg)
	logger = zap.S().With("collector", "cmd")
}

// HelloWorld writes "Hello, World!" to the HTTP response.
func Collect(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	log.Request(ctx, w, r)
	c := collector.New(ctx, cfg, r.Body)
	c.Pull()
	c.Process()
	c.Push()
	// logger.Infof("successfully processed body: %v", c)
}
