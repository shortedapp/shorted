package source

import (
	"context"

	"github.com/shortedapp/shorted/services/watcher/pkg/index"
)

type (
	Info struct {
		Name        string
		Impl        string
		Description string
		NewBuilder  NewBuilderrFn
	}
	InfoFn         func() Info
	NewBuilderrFn  func() HandlerBuilder
	HandlerBuilder interface {
		Validate() error
		Build() (Handler, error)
	}
	Handler interface {
		Parse(context.Context, *Source) (*index.Source, error)
	}
	Source struct {
		Name    string
		URL     string
		BaseURL string
		Format  string
		Info    *Info
		Handler Handler
	}
)
