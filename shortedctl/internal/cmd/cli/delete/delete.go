package delete

import (
	"github.com/shortedapp/shorted/shortedctl/internal/cmd/cli/watcher"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "delete",
		Short: "delete resource",
	}
	c.AddCommand(watcher.DeleteCommand())
	return c
}
