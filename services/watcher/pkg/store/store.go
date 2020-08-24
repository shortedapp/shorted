package store

import (
	"github.com/shortedapp/shorted/services/watcher/pkg/index"
)

type Store interface {
	// get index from given store
	GetIndex() index.FileIndex
	// update index
	PutIndex(*index.FileIndex) error
}