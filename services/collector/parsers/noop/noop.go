package noop

import (
	"context"
	"io"

	"github.com/shortedapp/shorted/services/collector/parsers/metadata"
	"github.com/shortedapp/shorted/services/collector/pkg/parser"
)

type handler struct{}

func (h *handler) Parse(ctx context.Context, reader io.ReadCloser, opts ...parser.Option) (int, []byte, error) {
	return 0, nil, nil
}

// GetInfo returns the Info associated with this source implementation.
func GetInfo() parser.Info {
	info := metadata.GetInfo("noop")
	info.NewBuilder = func() parser.HandlerBuilder { return &builder{} }
	return info
}

type builder struct{}

func (*builder) Validate() error { return nil }
func (b *builder) Build() (parser.Handler, error) {
	return &handler{}, nil
}
