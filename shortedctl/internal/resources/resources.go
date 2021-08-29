package resources

import (
	"fmt"
	"io/ioutil"

	// "gopkg.in/yaml.v3"
	"github.com/ghodss/yaml"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
	"github.com/spf13/cobra"

	jsonpb "google.golang.org/protobuf/encoding/protojson"
	// "github.com/golang/protobuf/jsonpb"
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
	yamlBytes, err := ioutil.ReadFile(file)
	if err != nil {
		return nil, fmt.Errorf("failed loading provided file: %v, err: %v", file, err)
	}

	jsonBytes, err := yaml.YAMLToJSON(yamlBytes)

	if err != nil {
		return nil, fmt.Errorf("error converting yaml to JSON")
	}
	err = jsonpb.Unmarshal(jsonBytes, &watcher)

	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal json: %v", err)
	}

	return &watcher, nil
}
