package driver

import (
	"errors"
	"fmt"

	v1 "github.com/shortedapp/shorted/shortedapis/pkg/shorted/service/watcher/v1"
)

var (
	//ErrIndexNotFound indicates that an index is not found
	ErrIndexNotFound = errors.New("index: not found")
	// ErrIndexExists indicates that a release already exists.
	ErrIndexExists = errors.New("index: already exists")
	// ErrDeletingIndex indicates that a release already exists.
	ErrDeletingIndex = errors.New("index: failed to delete")
	// ErrDeletingIndex indicates that a release already exists.
	ErrUnknown = errors.New("unknown failure")
)

type StoreDriverError struct {
	IndexName string
	Err       error
}

func (e *StoreDriverError) Error() string {
	return fmt.Sprintf("%q %s", e.IndexName, e.Err.Error())
}

func (e *StoreDriverError) Unwrap() error { return e.Err }

// // Creator is the interface that wraps the Create method.
// //
// // Create stores the index or returns ErrIndexExists
// // if an identical index already exists.
type Creator interface {
	Create(idx *v1.WatcherDetails) error
}

// // Delete is the interface that wraps the Delete method.
// //
// // Delete remove the index or returns ErrIndexNotFound
// // if
type Deletor interface {
	Delete(string) (*v1.WatcherDetails, error)
}

// Updator is the interface that wraps the Update method.
//
// Update updates an existing index or returns
// ErrIndexNotFound if the index does not exist.
type Updator interface {
	Update(idx *v1.WatcherDetails) error
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
	Get(string) (*v1.WatcherDetails, error)
	GetInfo(string) (*v1.WatcherDetails, error)
	// Get(key string) (*index.Watch, error)
	List() ([]*v1.WatcherDetails, error)
	// Query(labels map[string]string) ([]*index.Watch, error)
}

// Driver is the interface composed of Creator, Updator,
// interfaces. It defines the behavior for storing, updating,
// the watcher index from some underlying storage mechanism,
// e.g. gcs, local disk.
type Driver interface {
	Creator
	Deletor
	Updator
	Queryor
	Name() string
}
