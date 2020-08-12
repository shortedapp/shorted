package watcher

import (
	"context"
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
)

// Watcher - collecting arbitrary data and storing as required
type Watcher struct {
	// URL we will be collecting data from
	Source         Source `json:"source"`
	Pattern        Pattern
	Result         Result
	loggingEncoder string
	Context        context.Context
	Config         *config.Config
}
type Source struct {
	URL string `json"url"`
	// Format of file (will be used for parsing potential)
	Format string `json:"format"`
}
type Pattern struct {
	Value string
}
type Result struct {
	Data     []byte
	response *http.Response
	Status   string
}

func New(ctx context.Context, cfg *config.Config, r io.ReadCloser) *Watcher {
	w, err := processBody(r)
	w.Config = cfg
	w.Context = ctx
	if err != nil {
		return &Watcher{}
	}
	return &w
}

func (w *Watcher) Parse() error {
	var err error
	w.Result.response, err = http.Get(w.Source.URL)
	if err != nil {
		log.Errorf("unable to fetch contents for url %s", w.Source.URL)
		return err
	}
	log.Infof(w.Context, "pulled from %v", w.Source.URL)
	log.Response(w.Context, w.Result.response)

	w.Result.Status = "SUCCESS"
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
