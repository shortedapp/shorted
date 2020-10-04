package config

import (
	"context"
	"fmt"
	"os"
	"path"
	"strings"

	"github.com/mitchellh/mapstructure"
	"github.com/spf13/viper"
)

func Default() Config {

	return Config{
		APIVersion: "v1",
		Env: Env{
			Name: "non-production",
			Services: map[string]Service{
				"watcher": {
					Endpoint: "http://localhost:8080",
				},
			},
		},
	}
}

type Config struct {
	APIVersion string `yaml:"apiVersion"`
	Env        Env    `yaml:"env"`
	User       User   `yaml:"user"`
}

type Env struct {
	Name     string             `yaml:"name"`
	Services map[string]Service `yaml:"services"`
}

func (e *Env) GetService(name string) (*Service, error) {
	service, ok := e.Services[name]
	if !ok {
		return &Service{}, fmt.Errorf("service not found: %v", name)
	}
	return &service, nil
}

type Service struct {
	Endpoint string `yaml:"endpoint"`
}

type User struct {
	User string `yaml:"user"`
}

func Load(ctx context.Context, configPath string) (err error) {
	err = load(configPath)
	return

}

func Get() (cfg Config, err error) {
	err = viper.Unmarshal(&cfg)
	return
}

func load(configPath string) (err error) {
	var cfg Config
	if configPath != "" {
		viper.SetConfigFile(configPath)
	} else {
		viper.SetConfigType("yaml")
		viper.SetConfigName("config")
		wd, err := os.Getwd()
		if err != nil {
			return fmt.Errorf("failed to find working directory: %v", err)
		}
		home, err := os.UserHomeDir()
		if err != nil {
			return fmt.Errorf("failed to find home directory: %v", err)
		}

		viper.AddConfigPath(path.Join(wd, ".shorted"))
		viper.AddConfigPath(path.Join(home, ".shorted"))
	}
	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	viper.SetDefault("env", getMap(Default().Env))
	err = viper.ReadInConfig()
	if err != nil {
		return fmt.Errorf("error reading in config: %v", err)
	}
	err = viper.Unmarshal(&cfg)
	if err != nil {
		return fmt.Errorf("unable to unmarshal config: %v", err)
	}
	return nil
}

func getMap(config interface{}) map[string]interface{} {
	var inInterface map[string]interface{}
	_ = mapstructure.Decode(config, &inInterface)
	return inInterface
}
