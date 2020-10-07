package watcher

import (
	"fmt"

	"github.com/google/uuid"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
	watcherV1Client "github.com/shortedapp/shorted/shortedctl/internal/client/watcher/v1"
	"github.com/shortedapp/shorted/shortedctl/internal/config"
	"github.com/spf13/cobra"
)

func DeleteCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "watcher",
		Short: "delete watcher",
		RunE: func(cmd *cobra.Command, args []string) error {
			watcherConfig := v1.WatcherDetails{
				Metadata: &v1.Metadata{
					Id:   args[0],
				},
			}
			fmt.Printf("idL %v", watcherConfig.Metadata.Id)
			if _, err := uuid.Parse(watcherConfig.Metadata.Id); err != nil {
				return fmt.Errorf("invalid id: %v, err: %v", args[0], err)
			}
			cfg, err := config.Get()
			if err != nil {
				fmt.Errorf("error loading config: %v", err)
			}
			file, err := cmd.Flags().GetString("file")
			if err != nil {
				return fmt.Errorf("error fetching provided file path from flags", err)
			}
			switch {
			case file == "" && len(args) == 0:
				return fmt.Errorf("invalid input need file path or id argument")
			case len(args) == 1:
				id := args[0]
				client, err := watcherV1Client.NewForConfig(&cfg)
				if _, err = client.Watchers().Delete(id); err != nil {
					return err
				}

			}

			return nil
		},
	}
	c.Flags().StringP("file", "f", "", "file path to resource to delete")
	return c
}
