package shortedctl

import (
	"context"
	"os"
	"path/filepath"

	"log"

	"github.com/shortedapp/shorted/shortedctl/internal/cmd/cli/describe"
	"github.com/shortedapp/shorted/shortedctl/internal/cmd/cli/delete"
	"github.com/shortedapp/shorted/shortedctl/internal/cmd/cli/create"
	"github.com/shortedapp/shorted/shortedctl/internal/cmd/cli/get"
	"github.com/shortedapp/shorted/shortedctl/internal/cmd/cli/version"
	"github.com/shortedapp/shorted/shortedctl/internal/config"
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
	c.AddCommand(
		version.NewCommand(),
		get.NewCommand(),
		create.NewCommand(),
		delete.NewCommand(),
		describe.NewCommand(),
	)
	cobra.OnInitialize(load)
	return c
}

func load() {
	err := config.Load(context.Background(), cfgFile)
	if err != nil {
		log.Fatalf("error loading config: %v", err)
	}
}

func Execute() {
	baseName := filepath.Base(os.Args[0])
	rootCmd := NewCommand(baseName)
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}
