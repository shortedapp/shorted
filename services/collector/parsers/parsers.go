package parsers

import (
	"fmt"

	"github.com/shortedapp/shorted/services/collector/parsers/noop"
	"github.com/shortedapp/shorted/services/collector/parsers/csv"
	"github.com/shortedapp/shorted/services/collector/parsers/shorts"
	"github.com/shortedapp/shorted/services/collector/pkg/parser"
)

// Inventory - fetch list of available strategies
func Inventory() []parser.InfoFn {
	return []parser.InfoFn{
		shorts.GetInfo,
		csv.GetInfo,
		noop.GetInfo,
	}
}

//Getparser - fetch strategy based of input name
func GetParser(name string) (*parser.Info, error) {
	var availableParsers = make([]string, 0)
	for _, parser := range Inventory() {
		s := parser()
		availableParsers = append(availableParsers, s.Name)
		if s.Name == name {
			return &s, nil
		}
	}
	return nil, fmt.Errorf("no parsers found with name:  %s, available options: %v", name, availableParsers)
}
