package create

import (
	"github.com/shortedapp/shorted/shortedctl/internal/cmd/cli/watcher"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "create",
		Short: "Create resource",
	}
	c.AddCommand(watcher.CreateCommand())
	return c
}
