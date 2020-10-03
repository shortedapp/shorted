package get

import (
	"github.com/shortedapp/shorted/shortedctl/internal/cmd/cli/watcher"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "get",
		Short: "Display one or many resources",
	}
	c.AddCommand(watcher.ListCommand())
	return c
}
