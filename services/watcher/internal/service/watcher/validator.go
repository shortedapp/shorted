package watcher 

import (
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
)
type Validator interface {
	ValidateCreateWatcherRequest(req *v1.CreateWatcherRequest) error
}

type watcherValidator struct {}


func newValidator() Validator {
	return &watcherValidator{}
}

func (*watcherValidator) ValidateCreateWatcherRequest(req *v1.CreateWatcherRequest) error {
	return nil
}