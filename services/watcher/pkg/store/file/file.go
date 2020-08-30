package gcs

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/url"
	"path"

	"github.com/shortedapp/shorted/services/watcher/pkg/index"
	_ "gocloud.dev/blob/gcsblob"
)

type Store struct {
	folder    string
	indexPath string
}

func NewStore(ctx context.Context, path string) (*Store, error) {
	folder, indexPath := separatePath(path)
	s := Store{
		folder:    folder,
		indexPath: indexPath,
	}

	return &s, nil
}

func (s *Store) GetIndex() (index.IndexFile, error) {
	idx := index.IndexFile{}
	file, err := ioutil.ReadFile(path.Join(s.folder, s.indexPath))
	if err != nil {
		return idx, fmt.Errorf("failed reading file: %v", err)
	}
	err = json.Unmarshal([]byte(file), &idx)
	if err != nil {
		return idx, err
	}
	return idx, nil
}

func (s *Store) PutIndex(idx *index.IndexFile) error {

	return nil
}

func separatePath(s string) (string, string) {
	u, _ := url.Parse(s)
	return fmt.Sprintf("%s://%s", u.Scheme, u.Host), u.Path
}
