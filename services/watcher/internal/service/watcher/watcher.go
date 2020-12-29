package watcher

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	"github.com/shortedapp/shorted/services/watcher/pkg/store"
	"github.com/shortedapp/shorted/services/watcher/sources"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
)

// Watcher - collecting arbitrary data and storing as required
type Watcher struct {
	// URL we will be collecting data from
	loggingEncoder string
	Context        context.Context
	Config         *config.Config
	store          *store.Index
	v1.WatchServiceServer
}

// validate WatchService implements v1.WatchServiceServer
// var _ v1.WatchServiceServer = (*WatchService)(nil)

// func New(ctx context.Context, cfg *config.Config, r io.ReadCloser) *Watcher {
func New(ctx context.Context, cfg *config.Config) (*Watcher, error) {
	log.InitLogger(cfg)
	var w Watcher
	// s, err := sources.GetSource("asic")
	// if err != nil {
	// 	return &Watcher{}, fmt.Errorf("invalid source name set: %v", err)
	// }
	// handler, err := s.NewBuilder().Build()

	// if err != nil {
	// 	return &Watcher{}, fmt.Errorf("failed to build source handler: %v", err)
	// }
	// w.Source = &source.Source{
	// 	Name:    "https://asic.gov.au",
	// 	URL:     "https://asic.gov.au/regulatory-resources/markets/short-selling/short-position-reports-table/",
	// 	BaseURL: "https://asic.gov.au",
	// 	Format:  "csv",
	// 	Handler: handler,
	// }
	// log.Infof(ctx, "loaded source: %v", w.Source)

	s, err := store.New("gs://shorted-dev-aba5688f-watcher-index")
	if err != nil {
		return &Watcher{}, fmt.Errorf("failed initialising store: %v", err)
	}
	w.store = s
	w.Config = cfg
	w.Context = ctx
	return &w, nil
}

// func (w *Watcher) Parse() error {
// 	sourceIndex, err := w.Source.Handler.Parse(w.Context, w.Source)
// 	if err != nil {
// 		log.Errorf("parseError: %v", err)
// 		return err
// 	}
// 	w.watch.Add(sourceIndex)
// 	return err
// }

// Difference will attempt to resolve the difference between the given parsed source and whats been stored in the watcher index
// func (w *Watcher) Discover() error {
// 	w.Parse()
// 	currentIndex, err := w.store.Get()
// 	if err != nil {
// 		log.Errorf("error fetching index: %v", err)
// 		return fmt.Errorf("error fetching index: %v", err)
// 	}
// 	new := currentIndex.Compare(w.watch)
// 	fmt.Printf("new.EntriesCount: %v\n", new.EntriesCount())
// 	return nil
// }

// func processBody(r io.ReadCloser) (Watcher, error) {
// 	var w Watcher
// 	body, err := ioutil.ReadAll(r)
// 	if err != nil {
// 		return w, err
// 	}
// 	err = json.Unmarshal(body, &w)
// 	if err != nil {
// 		return w, err
// 	}
// 	return w, nil
// }

// GetWatch information about a specific configured Watch
func (w *Watcher) GetWatcher(ctx context.Context, in *v1.GetWatcherRequest) (*v1.GetWatcherResponse, error) {
	watcher, err := w.store.Get(in.Id)
	if err != nil {
		return nil, err
	}
	return &v1.GetWatcherResponse{
		Watch: watcher}, nil
}

func (w *Watcher) CreateWatcher(ctx context.Context, in *v1.CreateWatcherRequest) (*v1.CreateWatcherResponse, error) {
	id := uuid.New().String()
	watcher := v1.WatcherDetails{
		Metadata: &v1.Metadata{
			Id:                id,
			Name:              in.GetWatch().GetMetadata().Name,
			CreationTimestamp: time.Now().Format(time.RFC3339),
		},
		Spec: &v1.Spec{
			Source: in.Watch.GetSpec().GetSource(),
		},
	}
	err := w.store.Create(&watcher)

	if err != nil {
		return nil, err
	}
	return &v1.CreateWatcherResponse{Watch: &watcher}, nil
}

func (w *Watcher) ListWatchers(ctx context.Context, in *v1.ListWatchersRequest) (*v1.ListWatchersResponse, error) {
	watcherList, err := w.store.List()
	if err != nil {
		return nil, err
	}
	return &v1.ListWatchersResponse{Watches: watcherList}, nil
}

func (w *Watcher) DeleteWatcher(ctx context.Context, in *v1.DeleteWatcherRequest) (*v1.DeleteWatcherResponse, error) {
	id := in.GetId()
	watcher, err := w.store.Get(id)
	if err != nil {
		return nil, err
	}
	w.store.Delete(id)

	return &v1.DeleteWatcherResponse{Watch: watcher}, nil
}
// SyncWatcher is responsible for discovering outstanding documents available for collection and managing the
// collection process. General workflow is as follows:
// 1. fetch current index
// 2. discover latest context from given source
// 3. compare difference between current and latest documents
// 4. synchronise/collect new documents via the collector service
// 5. update index with new state based on results of synchronisation status
func (w *Watcher) SyncWatcher(ctx context.Context, in *v1.SyncWatcherRequest) (*v1.SyncWatcherResponse, error) {
	id := in.Id
	fmt.Printf("syncing watcher: %v", id)
	// fetch watcher index
	watcher, err := w.store.Get(id)
	if err != nil {
		return nil, fmt.Errorf("error synchronising watcher %v, error: %v", id, err)
	}
	source, err := sources.GetSource(watcher.Spec.Source.Adapter)
	if err != nil {
		return nil, fmt.Errorf("failed to get source %v, error: %v", watcher.Spec.Source.Adapter, err)
	}
	handler, err := source.NewBuilder().Build()
	if err != nil {
		return nil, fmt.Errorf("failed to build handler, error: %v", err)
	}
	manager, err := handler.Parse(ctx, watcher.Spec.Source)

	difference := manager.Difference(watcher.Spec.Index)

	// 1. start collecting new documents - async go routine?
	// 2. once completed we update index with successfully collected documents - needs to do with with a mutex

	log.Infof(ctx, "[Source:%v]: found %v new documents", watcher.Spec.Source.Url, difference.GetIndex().Count)

	return nil, nil
}

func (w *Watcher) SyncAll(ctx context.Context, in *v1.SyncAllRequest) (*v1.SyncAllResponse, error) {
	fmt.Print("syncing all watcher")
	return nil, nil
}
