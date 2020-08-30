package index

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"path"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const (
	testfile = "testdata/local-index.yaml"
)

func TestIndexFile(t *testing.T) {
	i := NewIndexFile()
	i.Add(&Metadata{
		Name:    "/reports/test/file1.csv",
		Year:    "2020",
		Month:   "01",
		Day:     "01",
		Format:  "csv",
		Version: "1.1.0",
	}, "/reports/test/file.csv", "https://localhost/", "")
	i.Add(&Metadata{
		Name:    "/reports/test/file1.csv",
		Year:    "2020",
		Month:   "01",
		Day:     "02",
		Format:  "csv",
		Version: "1.2.0",
	}, "/reports/test/file.csv", "https://localhost/", "")
	i.Add(&Metadata{
		Name:    "/reports/test/file2.csv",
		Year:    "2020",
		Month:   "01",
		Day:     "01",
		Format:  "csv",
		Version: "1.0.0",
	}, "/reports/test/file2.csv", "https://localhost/", "")

	i.SortEntries()
	assert.Equal(t, i.APIVersion, APIVersionV1)
	assert.Equal(t, len(i.Entries), 2)
	assert.Equal(t, i.Entries["/reports/test/file1.csv"][0].Version, "1.2.0")
}

func TestLoadIndex(t *testing.T) {
	s, err := NewStore(context.Background(), "testdata/local-index.json")
	require.NoErrorf(t, err, "error initialising new file based store: %v", err)
	i, err := LoadIndexFile(s)
	require.NoErrorf(t, err, "error loading index from store: %v, index: %v", err, i)

}




// dummy load file store
type FileStore struct {
	folder    string
	indexPath string
}

func NewStore(ctx context.Context, path string) (*FileStore, error) {
	folder, indexPath := filepath.Dir(path), filepath.Base(path)
	s := FileStore{
		folder:    folder,
		indexPath: indexPath,
	}

	return &s, nil
}

func (s *FileStore) GetIndex() (IndexFile, error) {
	idx := IndexFile{}
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

func (s *FileStore) PutIndex(idx *IndexFile) error {

	return nil
}
