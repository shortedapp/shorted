package csv

import (
	"bufio"
	"bytes"
	"context"
	"encoding/csv"
	"io"
	"io/ioutil"
	"unicode/utf8"

	"github.com/shortedapp/shorted/services/collector/parsers/metadata"
	"github.com/shortedapp/shorted/services/collector/pkg/log"
	"github.com/shortedapp/shorted/services/collector/pkg/parser"
)

type handler struct {
	cfg *parser.Config
}

func (h *handler) Parse(ctx context.Context, reader io.ReadCloser, opts ...parser.Option) (int, []byte, error) {
	for _, opt := range opts {
		opt(h.cfg)
	}
	var data []byte
	count := 0
	b, _ := ioutil.ReadAll(reader)
	raw := bufio.NewReader(bytes.NewReader(b))
	r := csv.NewReader(bytes.NewReader(b))
	if h.cfg.Delimeter != "" {
		r.Comma, _ = utf8.DecodeRuneInString(h.cfg.Delimeter)
	}
	r.FieldsPerRecord = -1
	r.Comma = '\t'
	for {
		line, err := raw.ReadBytes('\n')
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
	log.Infof(ctx, "processed %d rows", count)
	return count, data, nil
}

// GetInfo returns the Info associated with this source implementation.
func GetInfo() parser.Info {
	info := metadata.GetInfo("csv")
	info.NewBuilder = func() parser.HandlerBuilder { return &builder{} }
	return info
}

type builder struct{}

func (*builder) Validate() error { return nil }
func (b *builder) Build() (parser.Handler, error) {
	return &handler{}, nil
}
