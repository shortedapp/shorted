package source

import "context"

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
		Parse(context.Context, *Source) (*FileIndex, error)
	}
	Source struct {
		URL     string
		Format  string
		Info    *Info
		Handler Handler
	}
	FileIndex struct {
		Count     int
		Documents []Document
	}
	Document struct {
		Year   string
		Month  string
		Day    string
		URL    string
		Format string
	}
)
