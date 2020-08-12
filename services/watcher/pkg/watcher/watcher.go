package watcher

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"path/filepath"

	"github.com/PuerkitoBio/goquery"
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

// func New(ctx context.Context, cfg *config.Config, r io.ReadCloser) *Watcher {
func New(ctx context.Context, cfg *config.Config) *Watcher {
	var w Watcher
	w.Source.URL = "https://asic.gov.au/regulatory-resources/markets/short-selling/short-position-reports-table/"
	w.Config = cfg
	w.Context = ctx
	return &w
}

func (w *Watcher) Parse() error {
	var err error
	w.Result.response, err = http.Get(w.Source.URL)
	if err != nil {
		log.Errorf("unable to fetch contents for url %s", w.Source.URL)
		return err
	}
	defer w.Result.response.Body.Close()
	// Load the HTML document
	doc, err := goquery.NewDocumentFromReader(w.Result.response.Body)
	if err != nil {
		log.Fatal(err)
	}
	// Find the review items
	doc.Find(".pulldown").Each(func(i int, s *goquery.Selection) {
		// For each item found, get the band and title
		s.Find("a").Each(func(i int, s *goquery.Selection) {
			val, _ := s.Attr("href")
			if filepath.Ext(val) == ".csv" {
				fmt.Printf("%v\n", val)
			}
		})
	})
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
