package watcher

import (
	"fmt"
	"os"

	watcherV1 "github.com/shortedapp/shorted/shortedctl/internal/client/watcher/v1"
	"github.com/shortedapp/shorted/shortedctl/internal/config"
	"github.com/shortedapp/shorted/shortedctl/internal/output"
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
				resp, err := client.Watchers().List()
				if err != nil {
					fmt.Printf("client error: %v", err)
				}
				printer := output.NewTablePrinter()
				if err := printer.PrintObj(resp, os.Stdout); err != nil {
					return fmt.Errorf("error printing output: %v", err)
				}

			} else {
				//TODO(castlemilk): add get call here and necessary print logic
				fmt.Printf("getting specific watcher if found\n")
			}
			return nil
		},
	}
	return c
}

func GetCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "get",
		Short: "get or list watchers",
		RunE: func(cmd *cobra.Command, args []string) error {
			cfg, err := config.Get()
			if err != nil {
				fmt.Errorf("error loading config: %v", err)
			}
			client, err := watcherV1.NewForConfig(&cfg)
			if len(args) == 0 {
				resp, err := client.Watchers().List()
				if err != nil {
					fmt.Printf("client error: %v", err)
				}
				printer := output.NewTablePrinter()
				if err := printer.PrintObj(resp, os.Stdout); err != nil {
					return fmt.Errorf("error printing output: %v", err)
				}

			} else {
				//TODO(castlemilk): add get call here and necessary print logic
				fmt.Printf("getting specific watcher if found\n")
			}
			return nil
		},
	}
	return c
}

