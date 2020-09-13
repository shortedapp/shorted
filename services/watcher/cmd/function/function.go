package watcher

import (
	"context"
	"net/http"
	"os"
	"strings"

	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	"github.com/shortedapp/shorted/services/watcher/pkg/service"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"google.golang.org/grpc"
)

var (
	cfg  *config.Config
	mux  *http.ServeMux
	gmux *grpc.Server
)

func init() {
	cfg = &config.Config{
		ProjectId:      os.Getenv("PROJECT_ID"),
		LoggingEncoder: os.Getenv("LOGGING_ENCODER"),
	}
	log.InitLogger(cfg)
	mux = http.NewServeMux()
	gmux = grpc.NewServer()
	v1.RegisterWatchServiceServer(gmux, &service.WatchService{})

}

// HelloWorld writes "Hello, World!" to the HTTP response.
func Watch(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	log.Request(ctx, w, r)
	// watch, err := watcher.New(ctx, cfg)
	// if err != nil {
	// 	panic(fmt.Errorf("failed initialisig Watch: %v", err))
	// }
	// watch.Parse()
	dispatcher(ctx, gmux, mux).ServeHTTP(w, r)
	// watcherv1.RegisterWatchServiceHandler()
	// logger.Infof("successfully processed body: %v", c)
}

func dispatcher(ctx context.Context, grpcHandler http.Handler, httpHandler http.Handler) http.Handler {
	hf := func(w http.ResponseWriter, r *http.Request) {
		req := r.WithContext(ctx)

		contentTypeHeader := r.Header.Get("content-type")

		if r.ProtoMajor == 2 && strings.HasPrefix(contentTypeHeader, "application/grpc") {
			log.Infof(ctx, "dispatching to grpc server: %v", contentTypeHeader)
			grpcHandler.ServeHTTP(w, req)
		} else {
			httpHandler.ServeHTTP(w, req)
		}
	}
	return h2c.NewHandler(http.HandlerFunc(hf), &http2.Server{})
}
