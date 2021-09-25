package sources

import (
	"fmt"
	"strings"
	"github.com/shortedapp/shorted/services/watcher/pkg/source"
	"github.com/shortedapp/shorted/services/watcher/sources/asic"
	"github.com/shortedapp/shorted/services/watcher/sources/noop"
)

// Inventory - fetch list of available strategies
func Inventory() []source.InfoFn {
	return []source.InfoFn{
		asic.GetInfo,
		noop.GetInfo,
	}
}

//GetSource - fetch strategy based of input name
func GetSource(name string) (*source.Info, error) {
	var availableSources = make([]string, 0)
	for _, source := range Inventory() {
		s := source()
		availableSources = append(availableSources, s.Name)
		if strings.EqualFold(s.Name, name) {
			return &s, nil
		}
	}
	return nil, fmt.Errorf("no sources found with name:  %s, available options: %v", name, availableSources)
}
