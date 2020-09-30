package gcf

import (
	"context"
	"net"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/shortedapp/shorted/services/watcher/internal/service/watcher"
	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

var (
	cfg  *config.Config
	mux  *http.ServeMux
	gmux *grpc.Server
)

func init() {
	ctx := context.Background()
	cfg = &config.Config{
		ProjectId:      os.Getenv("PROJECT_ID"),
		LoggingEncoder: os.Getenv("LOGGING_ENCODER"),
	}
	log.InitLogger(cfg)

	// Register HTTP API
	mux = http.NewServeMux()
	gwmux := runtime.NewServeMux()
	// v1.RegisterWatchServiceHandlerServer(ctx, gwmux, &service.WatchService{})
	mux.Handle("/", gwmux)

	// Register gRPC API
	gmux = grpc.NewServer()
	v1.RegisterWatchServiceServer(gmux, &watcher.Watcher{})
	reflection.Register(gmux)
	if err := os.RemoveAll("/tmp/watcher.sock"); err != nil {
		log.Fatalf("failed removing socket: %v", err)
	}
	lis, err := net.Listen("unix", "/tmp/watcher.sock")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	go gmux.Serve(lis)
	v1.RegisterWatchServiceHandlerFromEndpoint(ctx, gwmux, "/tmp/watcher.sock", []grpc.DialOption{
		grpc.WithInsecure(),
		grpc.WithDialer(func(addr string, timeout time.Duration) (net.Conn, error) {
			return net.DialTimeout("unix", addr, 5*time.Second)
		}),
	})

}

// Watch trigger a reconciliation of change a target source
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
			log.Infof(ctx, "dispatching to http server: %v", contentTypeHeader)
			httpHandler.ServeHTTP(w, req)
		}
	}
	return h2c.NewHandler(http.HandlerFunc(hf), &http2.Server{})
}
