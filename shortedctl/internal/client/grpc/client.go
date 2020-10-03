package grpc

import (
	"context"
	"crypto/tls"
	"fmt"

	"github.com/shortedapp/shorted/shortedctl/internal/config"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

type Interface interface {
	Dial(context.Context, string, ...grpc.DialOption) (*grpc.ClientConn, error)
}

type GRPCClient struct {
	transportCredentials grpc.DialOption
	config               *config.Config
	clientConn           *grpc.ClientConn
}

func NewGRPCClientFor(cfg *config.Config) *GRPCClient {
	var gc GRPCClient

	gc.config = cfg
	creds := credentials.NewTLS(&tls.Config{
		// InsecureSkipVerify: false,
	})
	gc.transportCredentials = grpc.WithTransportCredentials(creds)
	return &gc
}

func (g *GRPCClient) Dial(ctx context.Context, service string, opts ...grpc.DialOption) (*grpc.ClientConn, error) {
	opts = append(opts, g.transportCredentials)
	svc, err := g.config.Env.GetService(service)
	if err != nil {
		return nil, fmt.Errorf("could not find service request: %v", service)
	}
	return grpc.DialContext(ctx, svc.Endpoint, opts...)
}
