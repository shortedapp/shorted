package collector

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/shortedapp/shorted/services/collector/pkg/log"
)

// Collector - collecting arbitrary data and storing as required
type Collector struct {
	// URL we will be collecting data from
	Source      source `json:"source"`
	Sink        sink   `json:"sink"`
	Destination string `json:"format"`
	result      result
	loggingEncoder string
}
type source struct {
	URL string `json"url"`
	// Format of file (will be used for parsing potential)
	Format string `json:"format"`
}
type sink struct {
	Format string `json:"format"`
	URL    string `json:"url"`
}

type result struct {
	Data     []byte
	response *http.Response
}

func New(r io.ReadCloser) *Collector {
	c, err := processBody(r)
	c.loggingEncoder = os.Getenv("LOGGING_ENCODER")
	if err != nil {
		return &Collector{}
	}
	return &c
}

func (c *Collector) Pull() error {
	var err error
	c.result.response, err = http.Get(c.Source.URL)
	if err != nil {
		log.Errorf("unable to fetch contents for url %s", c.Source.URL)
		return err
	}
	log.Infof("pulled from %v", c.Source.URL)
	log.Response(c.result.response, c.loggingEncoder)
	return nil
}

func (c *Collector) Process() error {
	r := csv.NewReader(c.result.response.Body)
	r.FieldsPerRecord = 3
	r.Read()
	r.Read()
	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Errorf("error processing: %v", err)
			return err
		}
		fmt.Println(record)
	}
	return nil
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
