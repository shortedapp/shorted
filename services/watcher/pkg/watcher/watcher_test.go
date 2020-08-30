package watcher

import (
	"context"
	"testing"

	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestWatcher(t *testing.T) {
	w, err := New(context.Background(), config.DefaultConfig)
	require.NoErrorf(t, err, "failed initialising watcher: %v", err)
	assert.NotEqual(t, w, &Watcher{})
}
