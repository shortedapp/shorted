package collector

import (
	"encoding/json"
	"fmt"
	"html"
	"net/http"
	"os"

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
	var d struct {
		Name string `json:"name"`
	}
	if err := json.NewDecoder(r.Body).Decode(&d); err != nil {
		fmt.Fprint(w, "Hello, World!")
		return
	}
	if d.Name == "" {
		fmt.Fprint(w, "Hello, World!")
		return
	}
	fmt.Fprintf(w, "Hello, %s!", html.EscapeString(d.Name))

}
