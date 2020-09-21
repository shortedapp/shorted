package shortedctl

import (
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

var (
	// nolint: gochecknoglobals
	cfgFile  string
	logLevel string
)

func NewCommand(name string) *cobra.Command {
	c := &cobra.Command{
		Use:   name,
		Short: "Managing shorted services",
	}
	c.PersistentFlags().StringVarP(&cfgFile, "config", "c", "", "config file path")
	c.PersistentFlags().StringVarP(&logLevel, "loglevel", "v", "warn", "log level (error|warn|info|debug)")
	return c
}

func Execute() {
	baseName := filepath.Base(os.Args[0])
	rootCmd := NewCommand(baseName)
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}
