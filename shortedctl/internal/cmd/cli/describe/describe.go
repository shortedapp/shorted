package describe

import (
	"github.com/shortedapp/shorted/shortedctl/internal/cmd/cli/watcher"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "describe",
		Short: "show details of a specific resource",
	}
	c.AddCommand(watcher.DescribeCommand())
	return c
}
