package watcher

import (
	"fmt"

	"github.com/ghodss/yaml"
	watcherV1 "github.com/shortedapp/shorted/shortedctl/internal/client/watcher/v1"
	"github.com/shortedapp/shorted/shortedctl/internal/config"
	"github.com/spf13/cobra"
)

func DescribeCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "watcher",
		Short: "show details of a specific watcher",
		RunE: func(cmd *cobra.Command, args []string) error {
			cfg, err := config.Get()
			if err != nil {
				fmt.Errorf("error loading config: %v", err)
			}
			switch len(args) {
			case 0:
				return fmt.Errorf("must specific id of resource to describe")
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
				watcher, err := client.Watchers().Get(id)
				if err != nil {
					return fmt.Errorf("error fetching watcher: %v, error: %v", id, err)
				}
				d, err := yaml.Marshal(watcher)
				fmt.Printf("\n%s\n", string(d))
				return nil
			default:
				return fmt.Errorf("invalid input, must specify a specific ID to describe")
			}
		},
	}
	return c
}
