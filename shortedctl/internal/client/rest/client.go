package rest

import (
	"github.com/shortedapp/shorted/shortedctl/internal/config"
)

type Interface interface {
}

type RESTClient struct {
	config *config.Config
}

func NewRESTClientFor(cfg *config.Config) *RESTClient {
	var rc RESTClient

	rc.config = cfg
	return &rc
}
