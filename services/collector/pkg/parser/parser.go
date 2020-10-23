package parser

import (
	"context"
	"io"
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
	Config struct {
		Delimeter string
	}
	Option  func(cfg *Config)
	Handler interface {
		Parse(context.Context, io.ReadCloser, ...Option) (int, []byte, error)
	}
)
