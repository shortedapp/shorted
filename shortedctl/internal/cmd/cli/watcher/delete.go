package watcher

import (
	"fmt"

	"github.com/google/uuid"
	watcherV1Client "github.com/shortedapp/shorted/shortedctl/internal/client/watcher/v1"
	"github.com/shortedapp/shorted/shortedctl/internal/config"
	"github.com/shortedapp/shorted/shortedctl/internal/resources"
	"github.com/spf13/cobra"
)

func DeleteCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "watcher",
		Short: "delete watcher",
		RunE: func(cmd *cobra.Command, args []string) error {
			cfg, err := config.Get()
			if err != nil {
				return fmt.Errorf("error loading config: %v", err)
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
				if err := validateId(id); err != nil {
					return err
				}
				client, err := watcherV1Client.NewForConfig(&cfg)
				if _, err = client.Watchers().Delete(id); err != nil {
					return fmt.Errorf("failed to delete watcher %s, error: %v", id, err)
				}
			case file != "" && len(args) == 0:
				client, err := watcherV1Client.NewForConfig(&cfg)
				watcherConfig, err := resources.WatcherFromCmd(cmd)
				if err != nil {
					return fmt.Errorf("error reading file: %v", err)
				}
				id := watcherConfig.Metadata.Id
				if err := validateId(id); err != nil {
					return err
				}
				if _, err = client.Watchers().Delete(id); err != nil {
					return fmt.Errorf("failed to delete watcher %s, error: %v", id, err)
				}

			}

			return nil
		},
	}
	c.Flags().StringP("file", "f", "", "file path to resource to delete")
	return c
}

func validateId(id string) error {
	if _, err := uuid.Parse(id); err != nil {
		return fmt.Errorf("invalid id: %v, err: %v", id, err)
	}
	return nil
}
