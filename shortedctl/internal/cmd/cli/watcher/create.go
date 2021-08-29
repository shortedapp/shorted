package watcher

import (
	"fmt"

	watcherV1Client "github.com/shortedapp/shorted/shortedctl/internal/client/watcher/v1"
	"github.com/shortedapp/shorted/shortedctl/internal/config"
	"github.com/shortedapp/shorted/shortedctl/internal/resources"
	"github.com/spf13/cobra"
)

func CreateCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "watcher",
		Short: "create watchers",
		RunE: func(cmd *cobra.Command, args []string) error {
			cfg, err := config.Get()
			if err != nil {
				fmt.Errorf("error loading config: %v", err)
			}

			watcherConfig, err := resources.WatcherFromCmd(cmd)

			if err != nil || watcherConfig == nil {
				fmt.Errorf("error parsing watcher config from file")
				return err
			}
			client, err := watcherV1Client.NewForConfig(&cfg)

			fmt.Printf("client: %v, watcherConfig: %v", client, watcherConfig)

			_, err = client.Watchers().Create(watcherConfig)

			return err
		},
	}
	c.Flags().StringP("file", "f", "", "file path to resource to create")
	return c
}
