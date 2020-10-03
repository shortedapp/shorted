package v1

import (
	"context"

	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
	"github.com/shortedapp/shorted/shortedctl/internal/client/grpc"
	"github.com/shortedapp/shorted/shortedctl/internal/client/rest"
)

const (
	serviceName = "watcher"
)

type WatchersGetter interface {
	Watches() WatchersInferface
}

type WatchersInferface interface {
	List() ([]*v1.WatcherDetails, error)
}
type watchers struct {
	gc grpc.Interface
	rc rest.Interface
}

func newWatchers(c *WatcherV1Client) *watchers {
	return &watchers{
		gc: c.GRPCClient(),
		rc: c.RESTClient(),
	}
}

func (w *watchers) List() ([]*v1.WatcherDetails, error) {
	cc, err := w.gc.Dial(context.TODO(), serviceName)
	if err != nil {
		return nil, err
	}
	wc := v1.NewWatchServiceClient(cc)
	watcherList, err := wc.ListWatchers(context.TODO(), &v1.ListWatchersRequest{})
	if err != nil {
		return nil, err
	}
	return watcherList.Watches, nil
}
