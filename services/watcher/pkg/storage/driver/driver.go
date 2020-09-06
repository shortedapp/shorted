package driver

import (
	"errors"
	"fmt"

	"github.com/shortedapp/shorted/services/watcher/pkg/index"
)

var (
	//ErrIndexNotFound indicates that an index is not found
	ErrIndexNotFound = errors.New("index: not found")
	// ErrIndexExists indicates that a release already exists.
	ErrIndexExists = errors.New("index: already exists")
)

type StorageDriverError struct {
	IndexName string
	Err       error
}

func (e *StorageDriverError) Error() string {
	return fmt.Sprintf("%q %s", e.IndexName, e.Err.Error())
}

func (e *StorageDriverError) Unwrap() error { return e.Err }

// // Creator is the interface that wraps the Create method.
// //
// // Create stores the index or returns ErrIndexExists
// // if an identical index already exists.
// type Creator interface {
// 	Create(idx *index.Watch) error
// }

// Updator is the interface that wraps the Update method.
//
// Update updates an existing index or returns
// ErrIndexNotFound if the index does not exist.
type Updator interface {
	Update(idx *index.Watch) error
}

// Queryor is the interface that wraps the Get and List methods.
//
// Get returns the index named by key or returns ErrIndexNotFound
// if the index does not exist.
//
// List returns the set of all index that satisfy the filter predicate.
//
// Query returns the set of all index that match the provided label set.
type Queryor interface {
	Get() (*index.Watch, error)
	// Get(key string) (*index.Watch, error)
	// List(filter func(*index.Watch) bool) ([]*index.Watch, error)
	// Query(labels map[string]string) ([]*index.Watch, error)
}

// Driver is the interface composed of Creator, Updator,
// interfaces. It defines the behavior for storing, updating,
// the watcher index from some underlying storage mechanism,
// e.g. gcs, local disk.
type Driver interface {
	// Creator
	Updator
	Queryor
	Name() string
}
