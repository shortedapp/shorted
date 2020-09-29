package main

import (
	"context"
	"net"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/shortedapp/shorted/services/watcher/cmd/gcf"
	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
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
	// v1.RegisterWatchServiceHandlerFromEndpoint(ctx, gwmux, ":8080", nil)
	mux.Handle("/", gwmux)

	// Register gRPC API
	gmux := grpc.NewServer()
	v1.RegisterWatchServiceServer(gmux, &service.WatchService{})
	reflection.Register(gmux)
	if err := os.RemoveAll("/tmp/watcher.sock"); err != nil {
		log.Fatalf("failed removing socket: %v", err)
	}
	lis, err := net.Listen("unix", "/tmp/watcher.sock")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	go gmux.Serve(lis)

	if err != nil {
		log.Fatalf("error listening: %v", err)
	}
	v1.RegisterWatchServiceHandlerFromEndpoint(ctx, gwmux, "/tmp/watcher.sock", []grpc.DialOption{
		grpc.WithInsecure(),
		grpc.WithDialer(func(addr string, timeout time.Duration) (net.Conn, error) {
			return net.DialTimeout("unix", addr, 5*time.Second)
		}),
	})

	logger = zap.S().With("watcher", "cmd")

	funcframework.RegisterHTTPFunctionContext(ctx, "/", gcf.Watch)
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
