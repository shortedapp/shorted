package metadata

import (
	"fmt"

	"github.com/shortedapp/shorted/services/watcher/pkg/source"
)

var (
	Infos = []source.Info{
		{
			Name:        "noop",
			Impl:        "github.com/shortedapp/shorted/services/watcher/pkg/sources/noop",
			Description: "Does nothing (useful for testing)",
		},
		{
			Name:        "asic",
			Impl:        "github.com/shortedapp/shorted/services/watcher/pkg/sources/asic",
			Description: "parsing asic data source",
		},
	}
)

// GetInfo looks up an adapter info from the declaration list by name
func GetInfo(name string) source.Info {
	for _, info := range Infos {
		if info.Name == name {
			return info
		}
	}
	panic(fmt.Errorf("requesting a missing descriptor %q", name))
}
