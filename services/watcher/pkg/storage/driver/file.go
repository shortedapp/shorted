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
	folder    string
	indexPath string
}

func NewFile(path string) (*File, error) {
	folder, indexPath := separatePath(path)
	f := File{
		folder:    folder,
		indexPath: indexPath,
	}

	return &f, nil
}

func (f *File) Get() (*index.Watch, error) {
	idx := &index.Watch{}
	file, err := ioutil.ReadFile(path.Join(f.folder, f.indexPath))
	if err != nil {
		return idx, fmt.Errorf("failed reading file: %v", err)
	}
	err = json.Unmarshal([]byte(file), &idx)
	if err != nil {
		return idx, err
	}
	return idx, nil
}

func (f *File) Update(idx *index.Watch) error {

	return nil
}

func (f *File) Name() string {
	return FileDriverName
}
