package watcher

import (
	"context"
	"fmt"

	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	"github.com/shortedapp/shorted/services/watcher/pkg/store"
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

	store, err := store.New("gs://shorted-dev-aba5688f-watcher-index")
	if err != nil {
		return &Watcher{}, fmt.Errorf("failed initialising store: %v", err)
	}
	w.store = store
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
func (w *Watcher) GetWatch(ctx context.Context, in *v1.GetWatcherRequest) (*v1.GetWatcherResponse, error) {
	_, err := w.store.Get(in.Id)
	if err != nil {
		return nil, err
	}
	return &v1.GetWatcherResponse{
		Watch: &v1.WatcherDetails{}}, nil
}
