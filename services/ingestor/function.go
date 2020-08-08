package ingestor

import (
	"net/http"
	"fmt"
)

// HelloWorld writes "Hello, World!" to the HTTP response.
func Ingest(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, World!\n")
}