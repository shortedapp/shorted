package watcher

import (
	"fmt"

	"github.com/ghodss/yaml"
	watcherV1 "github.com/shortedapp/shorted/shortedctl/internal/client/watcher/v1"
	"github.com/shortedapp/shorted/shortedctl/internal/config"
	"github.com/spf13/cobra"
)

func SyncCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "sync <id>",
		Short: "synchronise a specific watcher",
		RunE: func(cmd *cobra.Command, args []string) error {
			cfg, err := config.Get()
			if err != nil {
				fmt.Errorf("error loading config: %v", err)
			}
			switch len(args) {
			case 0:
				return fmt.Errorf("must specific id of watcher to synchronise")
			case 1:
				client, err := watcherV1.NewForConfig(&cfg)
				if err != nil {
					return fmt.Errorf("error initialising client: %v", err)

				}
				id := args[0]
				if err := config.ValidateId(id); err != nil {
					return fmt.Errorf("invalid id provided: %v", err)
				}
				client, err = watcherV1.NewForConfig(&cfg)
				syncDetails, err := client.Watchers().Sync(id)
				if err != nil {
					return fmt.Errorf("error syncing watcher: %v, error: %v", id, err)
				}
				d, err := yaml.Marshal(syncDetails)
				fmt.Printf("\n%s\n", string(d))
				return nil
			default:
				return fmt.Errorf("invalid input, must specify a specific ID to describe")
			}
		},
	}
	return c
}
