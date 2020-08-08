package collector

import (
	"net/http"
	"os"

	"github.com/shortedapp/shorted/services/collector/pkg/collector"
	"github.com/shortedapp/shorted/services/collector/pkg/log"
	"go.uber.org/zap"
)

var (
	logger         *zap.SugaredLogger
	loggingEncoder string
)

func init() {
	log.InitLogger()
	logger = zap.S().With("collector", "cmd")
	loggingEncoder = os.Getenv("LOGGING_ENCODER")
}

// HelloWorld writes "Hello, World!" to the HTTP response.
func Collect(w http.ResponseWriter, r *http.Request) {
	log.LogRequest(w, r, loggingEncoder)
	c := collector.New(r.Body)
	c.Pull()
	c.Process()
	// logger.Infof("successfully processed body: %v", c)
}
