package watcher

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "watcher",
		Short: "interact with watcher service",
	}
	c.AddCommand(GetCommand())
	c.AddCommand(SyncCommand())
	return c
}
