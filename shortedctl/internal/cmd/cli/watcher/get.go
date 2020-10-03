package watcher

import (
	"fmt"

	watcherV1 "github.com/shortedapp/shorted/shortedctl/internal/client/watcher/v1"
	"github.com/shortedapp/shorted/shortedctl/internal/config"
	"github.com/spf13/cobra"
)

func ListCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "watcher",
		Short: "get or list watchers",
		RunE: func(cmd *cobra.Command, args []string) error {
			cfg, err := config.Get()
			if err != nil {
				fmt.Errorf("error loading config: %v", err)
			}
			client, err := watcherV1.NewForConfig(&cfg)
			if len(args) == 0 {
				fmt.Printf("listing watchers: %v, config: %v", client, cfg)
				resp, err := client.Watchers().List()
				if err != nil {
					fmt.Printf("client error: %v", err)
				}
				fmt.Printf("resp: %v", resp)
			} else {
				fmt.Printf("getting specific watcher if found")
			}
			return nil
		},
	}
	return c
}
