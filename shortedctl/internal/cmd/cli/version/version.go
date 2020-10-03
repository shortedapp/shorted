package version

import (
	"fmt"
	"io"
	"os"

	"github.com/shortedapp/shorted/shortedctl/internal/buildinfo"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	c := &cobra.Command{
		Use:   "version",
		Short: "Print the shortedctl version",
		Run: func(c *cobra.Command, args []string) {
			printVersion(os.Stdout)
		},
	}
	return c
}

func printVersion(w io.Writer) {
	fmt.Fprintln(w, "Client:")
	fmt.Fprintf(w, "\tVersion: %s\n", buildinfo.Version)
}
