package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	"github.com/shortedapp/shorted/services/watcher/internal/service/watcher"
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

	logger = zap.S().With("watcher", "cmd")
	defer logger.Sync()

	if err := runWithDispatcher(ctx); err != nil {
		log.Errorf("error running with cmux: %v", err)
	}

}

func runWithDispatcher(ctx context.Context) error {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Infof(ctx, "Defaulting to port %s", port)
	}
	// Register REST API
	mux := http.NewServeMux()
	gwmux := runtime.NewServeMux()
	mux.Handle("/", gwmux)
	opts := []grpc.DialOption{
		grpc.WithInsecure(),
	}
	v1.RegisterWatchServiceServer()
	// // dial to gRPC for handling request
	if err := v1.RegisterWatchServiceHandlerFromEndpoint(ctx, gwmux, ":8080", opts); err != nil {
		return fmt.Errorf("failed registering grpc-gateway: %v", err)
	}
	// Register GRPC API
	gmux := grpc.NewServer()
	v1.RegisterWatchServiceServer(gmux, &service.WatchService{})
	reflection.Register(gmux)
	server := &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: dispatcher(ctx, gmux, mux),
	}
	// start server
	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("error starting server :%v", err)
		return err
	}
	return nil
}

func dispatcher(ctx context.Context, grpcHandler http.Handler, httpHandler http.Handler) http.Handler {
	hf := func(w http.ResponseWriter, r *http.Request) {
		req := r.WithContext(ctx)
		log.Request(ctx, w, r)
		contentTypeHeader := r.Header.Get("Content-Type")
		if r.ProtoMajor == 2 && strings.HasPrefix(contentTypeHeader, "application/grpc") {
			log.Infof(ctx, "dispatching to grpc server: %s", contentTypeHeader)
			grpcHandler.ServeHTTP(w, req)
		} else if r.ProtoMajor == 2 {
			// TODO(castlemilk): explore why handler for protocol http/2 doesnt work
			log.Infof(ctx, "dispatching to http2 server: %s", contentTypeHeader)

			httpHandler.ServeHTTP(w, req)
		} else {
			log.Infof(ctx, "dispatching to http server: %s", contentTypeHeader)
			httpHandler.ServeHTTP(w, req)
		}
	}
	return h2c.NewHandler(http.HandlerFunc(hf), &http2.Server{})
}
