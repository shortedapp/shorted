package metadata

import (
	"fmt"
	"strings"
	"github.com/shortedapp/shorted/services/collector/pkg/parser"
)

var (
	Infos = []parser.Info{
		{
			Name:        "noop",
			Impl:        "github.com/shortedapp/shorted/services/collector/parsers/noop",
			Description: "Does nothing (useful for testing)",
		},
		{
			Name:        "csv",
			Impl:        "github.com/shortedapp/shorted/services/collector/parsers/csv",
			Description: "parsing generic csv data source",
		},
		{
			Name:        "asic",
			Impl:        "github.com/shortedapp/shorted/services/collector/parsers/asic",
			Description: "parsing ASIC short positions",
		},
	}
)

// GetInfo looks up an adapter info from the declaration list by name
func GetInfo(name string) parser.Info {
	for _, info := range Infos {
		if strings.EqualFold(info.Name,name) {
			return info
		}
	}
	panic(fmt.Errorf("requesting a missing descriptor %q", name))
}
