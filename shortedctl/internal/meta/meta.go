package meta

import (
	"fmt"

	"github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
)

func WatcherAccessor(obj interface{}) (*watcher.WatcherDetails, error) {
	switch t := obj.(type) {
	case *watcher.WatcherDetails:
		return t, nil
	default:
		return &watcher.WatcherDetails{}, fmt.Errorf("not valid object: %v, type: %T", t, obj)
	}
}
