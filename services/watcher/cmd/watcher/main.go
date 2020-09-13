package main

import (
	"context"
	"net/http"
	"os"
	"strings"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	"github.com/shortedapp/shorted/services/watcher/pkg/service"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
	"go.uber.org/zap"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

var (
	logger *zap.SugaredLogger
)

func main() {
	cfg := &config.Config{
		ProjectId:      os.Getenv("PROJECT_ID"),
		LoggingEncoder: os.Getenv("LOGGING_ENCODER"),
	}
	ctx := context.Background()
	log.InitLogger(cfg)

	// Register REST API
	mux := http.NewServeMux()
	gwmux := runtime.NewServeMux()
	v1.RegisterWatchServiceHandlerServer(ctx, gwmux, &service.WatchService{})
	mux.Handle("/", gwmux)

	// Register gRPC API
	gmux := grpc.NewServer()
	v1.RegisterWatchServiceServer(gmux, &service.WatchService{})
	reflection.Register(gmux)

	logger = zap.S().With("watcher", "cmd")

	// use dispatch to handle REST/gRPC APIs
	http.Handle("/d/", dispatcher(ctx, gmux, mux))
	if err := http.ListenAndServe(":8080", dispatcher(ctx, gmux, mux)); err != nil {
		log.Fatalf("server .ListenAndServe: %v\n", err)
	}
	defer zap.L().Sync()
}

func dispatcher(ctx context.Context, grpcHandler http.Handler, httpHandler http.Handler) http.Handler {
	hf := func(w http.ResponseWriter, r *http.Request) {
		req := r.WithContext(ctx)

		contentTypeHeader := r.Header.Get("content-type")

		if r.ProtoMajor == 2 && strings.HasPrefix(contentTypeHeader, "application/grpc") {
			log.Infof(ctx, "dispatching to grpc server: %s", contentTypeHeader)
			grpcHandler.ServeHTTP(w, req)
		} else {
			log.Infof(ctx, "dispatching to http server: %s", contentTypeHeader)
			httpHandler.ServeHTTP(w, req)
		}
	}
	return h2c.NewHandler(http.HandlerFunc(hf), &http2.Server{})
}
