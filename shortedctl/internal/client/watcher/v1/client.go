package v1

import (
	"github.com/shortedapp/shorted/shortedctl/internal/client/grpc"
	"github.com/shortedapp/shorted/shortedctl/internal/client/rest"
	"github.com/shortedapp/shorted/shortedctl/internal/config"
)

type WatcherV1Interface interface {
	RESTClient() rest.Interface
	GRPCClient() grpc.Interface
	WatchersGetter
}
type WatcherV1Client struct {
	restClient rest.Interface
	grpcClient grpc.Interface
}

func (c *WatcherV1Client) Watchers() WatchersInferface {
	return newWatchers(c)
}

func (c *WatcherV1Client) GRPCClient() grpc.Interface {
	if c == nil {
		return nil
	}
	return c.grpcClient
}

func (c *WatcherV1Client) RESTClient() rest.Interface {
	if c == nil {
		return nil
	}
	return c.restClient
}

func NewForConfig(cfg *config.Config) (*WatcherV1Client, error) {
	gc := grpc.NewGRPCClientFor(cfg)
	rc := rest.NewRESTClientFor(cfg)
	return &WatcherV1Client{rc, gc}, nil
}

func New(rc rest.Interface, gc grpc.Interface) *WatcherV1Client {
	return &WatcherV1Client{rc, gc}
}
