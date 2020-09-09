package config

type Config struct {
	ProjectId      string
	LoggingEncoder string
}

var DefaultConfig = &Config{
	ProjectId: "local",
	LoggingEncoder: "",
}
