package driver

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"path"

	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"

	_ "gocloud.dev/blob/gcsblob"
)

var _ Driver = (*File)(nil)

const (
	FileDriverName = "File"
)

type File struct {
	folder string
}

func NewFile(folder string) (*File, error) {
	f := File{
		folder: folder,
	}

	return &f, nil
}

func (f *File) Get(id string) (*v1.WatcherDetails, error) {
	idx := &v1.WatcherDetails{}
	file, err := ioutil.ReadFile(path.Join(f.folder, getIndexKey(id)))
	if err != nil {
		return idx, fmt.Errorf("failed reading file: %v", err)
	}
	err = json.Unmarshal([]byte(file), &idx)
	if err != nil {
		return idx, err
	}
	return idx, nil
}

func (f *File) Update(idx *v1.WatcherDetails) error {

	return nil
}
func (f *File) Create(idx *v1.WatcherDetails) error {

	return nil
}

func (f *File) Delete(id string) (*v1.WatcherDetails, error) {

	return &v1.WatcherDetails{}, nil
}

func (f *File) GetInfo(p string) (*v1.WatcherDetails, error) {
	return &v1.WatcherDetails{}, nil
}

// func (f *File) List(filter func (*v1.WatcherDetails) bool) ([]*v1.WatcherDetails, error) {
// 	return nil, nil
// }
func (f *File) List() ([]*v1.WatcherDetails, error) {
	return nil, nil
}

func (f *File) Name() string {
	return FileDriverName
}
