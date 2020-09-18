package main

import (
	"context"
	"fmt"
	"net"
	"net/http"
	"os"
	"strings"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	"github.com/shortedapp/shorted/services/watcher/pkg/service"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
	"github.com/soheilhy/cmux"
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

	// if err := runWithCmux(ctx); err != nil {
	// 	log.Errorf("error running with cmux: %v", err)
	// }
	if err := runWithDispatcher(ctx); err != nil {
		log.Errorf("error running with cmux: %v", err)
	}

}

func runWithCmux(ctx context.Context) error {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Infof(ctx, "Defaulting to port %s", port)
	}

	l, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		return fmt.Errorf("error listening on port %s with error: %v", port, err)
	}

	// Create the cmux object that will multiplex 2 protocols on the same port.
	// The two following listeners will be served on the same port below gracefully.
	m := cmux.New(l)
	// match grpc requests here
	grpcL := m.MatchWithWriters(cmux.HTTP2MatchHeaderFieldSendSettings("content-type", "application/grpc"))
	// TODO(castlemilk): add another match for HTTP pure and steer accordingly
	httpL := m.Match(cmux.Any())

	// Register REST API
	mux := http.NewServeMux()
	gwmux := runtime.NewServeMux()
	mux.Handle("/", gwmux)
	opts := []grpc.DialOption{
		grpc.WithInsecure(),
	}
	if err := v1.RegisterWatchServiceHandlerFromEndpoint(ctx, gwmux, ":8080", opts); err != nil {
		return fmt.Errorf("failed registering grpc-gateway: %v", err)
	}
	// Register GRPC API
	gRPCServer := grpc.NewServer()
	v1.RegisterWatchServiceServer(gRPCServer, &service.WatchService{})
	reflection.Register(gRPCServer)

	httpServer := &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: mux,
	}

	// Start the listeners for each protocol
	go func() {
		if err := gRPCServer.Serve(grpcL); err != nil {
			log.Errorf("error on grpc serve: %v", err)
			return
		}
	}()
	go func() {
		if err := httpServer.Serve(httpL); err != nil {
			log.Errorf("error on http serve: %v", err)
			return
		}
	}()
	// cmux starts all the servers for us when we call Serve() (grpcS and httpS)
	fmt.Printf("listening and serving (multiplexed) on: %s\n", port)
	m.HandleError(func(err error) bool {
		log.Errorf("error handling request: %v", err)
		return true
	})
	if err := m.Serve(); err != nil {
		return fmt.Errorf("failed running cmux serve")
	}
	return nil
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
