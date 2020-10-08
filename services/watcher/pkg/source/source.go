package source

import (
	"context"

	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
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
		Parse(context.Context, *v1.Source) (*Manager, error)
	}
)
