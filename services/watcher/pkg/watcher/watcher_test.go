package watcher 

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestCSV(t *testing.T) {
	var server *httptest.Server
	type test struct {
		input     string
		Collector Collector
	}
	tests := []test{
		{
			input: "testdata/data.csv",
			Collector: Collector{
				Source: Source{
					Format: "csv",
				},
				Sink: Sink{
					URL:    "file:///testdata/collector-bucket",
					Format: "csv",
				},
				loggingEncoder: "stackdriver",
			},
		},
	}

	for _, tc := range tests {
		tc := tc
		t.Run(tc.input, func(t *testing.T) {
			response, err := ioutil.ReadFile(tc.input)
			require.NoError(t, err)
			server = httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				fmt.Fprintln(w, string(response))
			}))
			tc.Collector.Source.URL = server.URL
			assert.NoError(t, tc.Collector.Pull())
			assert.Equalf(t, "SUCCESS", tc.Collector.Result.Status, "got request status: %v, want: %v", tc.Collector.Result.Status, "SUCCESS")
			assert.NoErrorf(t, tc.Collector.Process(), "error processing source")
			assert.NoErrorf(t, tc.Collector.Push(), "error pushing to sink")
			defer server.Close()
		})
	}
}
