package watcher

import (
	"fmt"
	"net/http"
	"os"

	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	"github.com/shortedapp/shorted/services/watcher/pkg/watcher"
	"github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
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
	watch, err := watcher.New(ctx, cfg)
	if err != nil {
		panic(fmt.Errorf("failed initialisig Watch: %v", err))
	}
	watch.Parse()
	// logger.Infof("successfully processed body: %v", c)
}
