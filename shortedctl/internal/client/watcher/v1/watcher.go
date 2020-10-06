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
	Get(id string) (*v1.WatcherDetails, error)
	List() ([]*v1.WatcherDetails, error)
	Create(*v1.WatcherDetails) (*v1.WatcherDetails, error)
	Delete(id string)(*v1.WatcherDetails, error)
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

func (w *watchers) Get(id string) (*v1.WatcherDetails, error) {
	cc, err := w.gc.Dial(context.TODO(), serviceName)
	if err != nil {
		return nil, err
	}
	wc := v1.NewWatchServiceClient(cc)
	watcher, err := wc.GetWatcher(context.TODO(), &v1.GetWatcherRequest{Id: id})
	if err != nil {
		return nil, err
	}
	return watcher.Watch, nil	
}

func (w *watchers) Delete(id string) (*v1.WatcherDetails, error) {
	cc, err := w.gc.Dial(context.TODO(), serviceName)
	if err != nil {
		return nil, err
	}
	wc := v1.NewWatchServiceClient(cc)
	watcher, err := wc.(context.TODO(), &v1.GetWatcherRequest{Id: id})
	if err != nil {
		return nil, err
	}
	return watcher.Watch, nil	
}

func (w *watchers) Create(watch *v1.WatcherDetails) (*v1.WatcherDetails, error) {
	cc, err := w.gc.Dial(context.TODO(), serviceName)
	if err != nil {
		return nil, err
	}
	wc := v1.NewWatchServiceClient(cc)
	resp, err := wc.CreateWatcher(context.TODO(), &v1.CreateWatcherRequest{
		Watch: watch,
	})
	if err != nil {
		return nil, err
	}
	return resp.Watch, nil
}
