package watcher

import (
	"fmt"
	"io/ioutil"

	"github.com/ghodss/yaml"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
	watcherV1Client "github.com/shortedapp/shorted/shortedctl/internal/client/watcher/v1"
	"github.com/shortedapp/shorted/shortedctl/internal/config"
	"github.com/spf13/cobra"
)

func CreateCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "watcher",
		Short: "get or list watchers",
		RunE: func(cmd *cobra.Command, args []string) error {
			var watcherConfig v1.WatcherDetails
			cfg, err := config.Get()
			if err != nil {
				fmt.Errorf("error loading config: %v", err)
			}
			file, err := cmd.Flags().GetString("file")
			if err != nil {
				return fmt.Errorf("error fetching provided file path from flags", err)
			}
			if file == "" {
				return fmt.Errorf("no file path specified")
			}

			fmt.Printf("file path to resource: %v", file)
			yamlFile, err := ioutil.ReadFile(file)
			if err != nil {
				return fmt.Errorf("failed loading provided file: %v, err: %v", file, err)
			}
			err = yaml.Unmarshal(yamlFile, &watcherConfig)
			fmt.Printf("watcher config: %v\n", watcherConfig)
			fmt.Printf("watcher name: %v\n", &watcherConfig.Metadata.Name)
			client, err := watcherV1Client.NewForConfig(&cfg)

			fmt.Printf("client: %v", client)

			_, err = client.Watchers().Create(&watcherConfig)

			return err
		},
	}
	c.Flags().StringP("file", "f", "", "file path to resource to create")
	return c
}
