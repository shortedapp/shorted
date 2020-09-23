package buildinfo

var (
	// Version is the current version of watcher, set by the go linker's -X flag at build time.
	Version string

	// SHA is the actual commit that is being built, set by the go linker's -X flag at build time.
	SHA string
)
