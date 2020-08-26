package watcher

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/index"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	"github.com/shortedapp/shorted/services/watcher/pkg/source"
	"github.com/shortedapp/shorted/services/watcher/pkg/store/gcs"
	"github.com/shortedapp/shorted/services/watcher/sources"
)

// Watcher - collecting arbitrary data and storing as required
type Watcher struct {
	// URL we will be collecting data from
	Source         *source.Source `json:"source"`
	Pattern        Pattern
	Result         Result
	loggingEncoder string
	Context        context.Context
	Config         *config.Config
	fileIndex      *index.FileIndex
	store          *gcs.Store
}
type Pattern struct {
	Value string
}
type Result struct {
	Data     []byte
	response *http.Response
	Status   string
}

// func New(ctx context.Context, cfg *config.Config, r io.ReadCloser) *Watcher {
func New(ctx context.Context, cfg *config.Config) *Watcher {
	var w Watcher
	s, err := sources.GetSource("asic")
	if err != nil {
		panic(fmt.Errorf("invalid source name set: %v", err))
	}
	handler, err := s.NewBuilder().Build()

	if err != nil {
		panic(fmt.Errorf("failed to build source handler: %v", err))
	}
	w.Source = &source.Source{
		URL:     "https://asic.gov.au/regulatory-resources/markets/short-selling/short-position-reports-table/",
		Format:  "csv",
		Handler: handler,
	}
	log.Infof(ctx, "loaded source: %v", w.Source)
	indexStore, err := gcs.NewStore(ctx, "gs://watcher-index-shorted-dev-aba5688f/index.json")
	if err != nil {
		panic(fmt.Errorf("failed initialising store: %v", err))
	}
	w.store = indexStore
	w.Config = cfg
	w.Context = ctx
	return &w
}

func (w *Watcher) Parse() error {
	fileIndex, err := w.Source.Handler.Parse(w.Context, w.Source)
	if err != nil {
		log.Errorf("parseError: %v", err)
		return err
	}
	w.fileIndex = fileIndex
	return err
}

// Difference will attempt to resolve the difference between the given parsed source and whats been stored in the watcher index
func (w *Watcher) Difference() error {
	fileIndex, err := w.store.GetIndex()
	if err != nil {
		log.Errorf("error fetching index: %v", err)
		return fmt.Errorf("error fetching index: %v", err)
	}
	fmt.Printf("fileIndex: %v", fileIndex)
	return nil
}

func processBody(r io.ReadCloser) (Watcher, error) {
	var w Watcher
	body, err := ioutil.ReadAll(r)
	if err != nil {
		return w, err
	}
	err = json.Unmarshal(body, &w)
	if err != nil {
		return w, err
	}
	return w, nil
}
