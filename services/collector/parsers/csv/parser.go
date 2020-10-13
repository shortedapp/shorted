package csv

import (
	"bytes"
	"context"
	"encoding/csv"
	"io"
	"io/ioutil"
	"unicode/utf8"

	"github.com/shortedapp/shorted/services/collector/pkg/log"
	"github.com/shortedapp/shorted/services/collector/pkg/parser"
)

type handler struct {
	cfg *parser.Config
}

func (h *handler) Parse(ctx context.Context, reader io.ReadCloser, opts ...parser.Option) ([]byte, error) {
	for _, opt := range opts {
		opt(h.cfg)
	}
	b, _ := ioutil.ReadAll(reader)
	r := csv.NewReader(bytes.NewReader(b))
	if h.cfg.Delimeter != "" {
		r.Comma, _ = utf8.DecodeRuneInString(h.cfg.Delimeter)
	}
	r.FieldsPerRecord = -1
	r.Comma = '\t'
	for {
		line, err := reader.ReadBytes('\n')
		_, validationErr := r.Read()
		if err == io.EOF || validationErr == io.EOF {
			break
		}
		if validationErr != nil {
			log.Infof(ctx, "skipping invalid row: %s, error: %s", string(line), validationErr)
			continue
		}
		data = append(data, line...)
		count++
	}
}
