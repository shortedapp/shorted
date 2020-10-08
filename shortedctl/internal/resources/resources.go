package resources

import (
	"fmt"
	"io/ioutil"

	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
	"github.com/spf13/cobra"
	"gopkg.in/yaml.v2"
)

func WatcherFromPath(file string) (*v1.WatcherDetails, error) {
	var watcher v1.WatcherDetails
	yamlFile, err := ioutil.ReadFile(file)
	if err != nil {
		return nil, fmt.Errorf("failed loading provided file: %v, err: %v", file, err)
	}
	err = yaml.Unmarshal(yamlFile, &watcher)
	return &watcher, nil
}

func WatcherFromCmd(cmd *cobra.Command) (*v1.WatcherDetails, error) {
	var watcher v1.WatcherDetails
	file, err := cmd.Flags().GetString("file")
	if err != nil {
		return nil, fmt.Errorf("error fetching provided file path from flags", err)
	}
	if file == "" {
		return nil, fmt.Errorf("no file path specified")
	}
	yamlFile, err := ioutil.ReadFile(file)
	if err != nil {
		return nil, fmt.Errorf("failed loading provided file: %v, err: %v", file, err)
	}
	err = yaml.Unmarshal(yamlFile, &watcher)
	return &watcher, nil
}
