package noop

import (
	"context"

	"github.com/shortedapp/shorted/services/watcher/pkg/source"
	"github.com/shortedapp/shorted/services/watcher/pkg/index"
	"github.com/shortedapp/shorted/services/watcher/sources/metadata"
)

type handler struct{}

func (*handler) Parse(ctx context.Context, s *source.Source) (*index.IndexFile, error) {
	return &index.IndexFile{}, nil
}

// GetInfo returns the Info associated with this source implementation.
func GetInfo() source.Info {
	info := metadata.GetInfo("noop")
	info.NewBuilder = func() source.HandlerBuilder { return &builder{} }
	return info
}

type builder struct{}

func (*builder) Validate() error { return nil }
func (b *builder) Build() (source.Handler, error) {
	return &handler{}, nil
}
