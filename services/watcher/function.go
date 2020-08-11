package watcher 

import (
	"net/http"
	"os"

	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	"github.com/shortedapp/shorted/services/watcher/pkg/watcher"
)

var (
	cfg *config.Config
)

func init() {
	cfg = &config.Config{
		ProjectId:      os.Getenv("PROJECT_ID"),
		LoggingEncoder: os.Getenv("LOGGING_ENCODER"),
	}
	log.InitLogger(cfg)
}

// HelloWorld writes "Hello, World!" to the HTTP response.
func Watch(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	log.Request(ctx, w, r)
	watch := watcher.New(ctx, cfg, r.Body)
	watch.Parse()
	// logger.Infof("successfully processed body: %v", c)
}
