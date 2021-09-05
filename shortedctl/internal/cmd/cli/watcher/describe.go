package watcher

import (
	"fmt"

	watcherV1 "github.com/shortedapp/shorted/shortedctl/internal/client/watcher/v1"
	"github.com/shortedapp/shorted/shortedctl/internal/config"
	"github.com/shortedapp/shorted/shortedctl/internal/output"
	"github.com/spf13/cobra"

	jsonpb "google.golang.org/protobuf/encoding/protojson"
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
				jsonbytes, err := jsonpb.Marshal(watcher)


				if err != nil {
					return fmt.Errorf("error marshaling json: %v", err)
				}

				return output.PrintYAML(jsonbytes)
			default:
				return fmt.Errorf("invalid input, must specify a specific ID to describe")
			}
		},
	}
	return c
}


