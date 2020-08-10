package collector

import (
	"bufio"
	"bytes"
	"context"
	"encoding/csv"
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/shortedapp/shorted/services/collector/pkg/clients/blob"
	"github.com/shortedapp/shorted/services/collector/pkg/config"
	"github.com/shortedapp/shorted/services/collector/pkg/log"
)

// Collector - collecting arbitrary data and storing as required
type Collector struct {
	// URL we will be collecting data from
	Source         Source `json:"source"`
	Sink           Sink   `json:"sink"`
	Destination    string `json:"format"`
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
type Sink struct {
	Format string `json:"format"`
	URL    string `json:"url"`
}

type Result struct {
	Data     []byte
	response *http.Response
	Status   string
}

func New(ctx context.Context, cfg *config.Config, r io.ReadCloser) *Collector {
	c, err := processBody(r)
	c.Config = cfg
	c.Context = ctx
	if err != nil {
		return &Collector{}
	}
	return &c
}

func (c *Collector) Pull() error {
	var err error
	c.Result.response, err = http.Get(c.Source.URL)
	if err != nil {
		log.Errorf("unable to fetch contents for url %s", c.Source.URL)
		return err
	}
	log.Infof(c.Context, "pulled from %v", c.Source.URL)
	log.Response(c.Context, c.Result.response)
	c.Result.Status = "SUCCESS"
	return nil
}

func (c *Collector) Process() error {
	b, _ := ioutil.ReadAll(c.Result.response.Body)
	reader := bufio.NewReader(bytes.NewReader(b))
	count := 0
	switch c.Source.Format {
	case "csv":
		r := csv.NewReader(bytes.NewReader(b))
		r.FieldsPerRecord = 3
		for {
			line, err := reader.ReadBytes('\n')
			_, validationErr := r.Read()
			if err == io.EOF || validationErr == io.EOF {
				break
			}
			if validationErr != nil {
				log.Infof(c.Context, "skipping invalid row: %s, error: %s", string(line), validationErr)
				continue
			}
			c.Result.Data = append(c.Result.Data, line...)
			count++
		}
		log.Infof(c.Context, "processed %d rows", count)
		return nil

	}
	return nil
}

func (c *Collector) Push() error {
	return blob.BucketWrite(c.Context, c.Sink.URL, c.Result.Data)
}

func processBody(r io.ReadCloser) (Collector, error) {
	var c Collector
	body, err := ioutil.ReadAll(r)
	if err != nil {
		return c, err
	}
	err = json.Unmarshal(body, &c)
	if err != nil {
		return c, err
	}
	return c, nil
}
