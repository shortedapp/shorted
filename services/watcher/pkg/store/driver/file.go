package driver

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"path"

	"github.com/shortedapp/shorted/services/watcher/pkg/index"
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

func (f *File) Get(p string) (*index.Watch, error) {
	idx := &index.Watch{}
	file, err := ioutil.ReadFile(path.Join(f.folder, p))
	if err != nil {
		return idx, fmt.Errorf("failed reading file: %v", err)
	}
	err = json.Unmarshal([]byte(file), &idx)
	if err != nil {
		return idx, err
	}
	return idx, nil
}

func (f *File) Update(p string, idx *index.Watch) error {

	return nil
}
func (f *File) Create(idx *index.Watch) error {

	return nil
}

func (f *File) Name() string {
	return FileDriverName
}
