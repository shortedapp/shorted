package index

import (
	"path"
	"time"

	"github.com/Masterminds/semver"
	"github.com/shortedapp/shorted/services/watcher/internal/urlutil"
)

type (
	IndexFile struct {
		APIVersion   string               `json:"apiVersion"`
		Generated    time.Time            `json:"generated"`
		Entries      map[string]Documents `json:"entries"`
		EntriesCount int                  `json:"count"`
	}

	Metadata struct {
		Name    string
		Year    string
		Month   string
		Day     string
		Format  string
		Version string
	}
)

// APIVersionV1 is the v1 API version for index and repository files.
const APIVersionV1 = "v1"

type Document struct {
	*Metadata `json:"metadata"`
	Created   time.Time `json:"created,omitempty"`
	Removed   bool      `json:"removed,omitempty"`
	Digest    string    `json:"digest,omitempty"`
	URL       string    `json:"url"`
}
type Documents []*Document

// Len returns the length.
func (d Documents) Len() int { return len(d) }

// Swap swaps the position of two items in the versions slice.
func (d Documents) Swap(i, j int) { d[i], d[j] = d[j], d[i] }

// Less returns true if the version of entry a is less than the version of entry b.
func (d Documents) Less(a, b int) bool {
	// Failed parse pushes to the back.
	i, err := semver.NewVersion(d[a].Version)
	if err != nil {
		return true
	}
	j, err := semver.NewVersion(d[b].Version)
	if err != nil {
		return false
	}
	return i.LessThan(j)
}

type Store interface {
	// get index from given store
	GetIndex() (IndexFile, error)
	// update index
	PutIndex(*IndexFile) error
}

// NewIndexFile initializes an index.
func NewIndexFile() *IndexFile {
	return &IndexFile{
		APIVersion: APIVersionV1,
		Generated:  time.Now(),
		Entries:    map[string]Documents{},
	}
}

func LoadIndexFile(store Store) (*IndexFile, error) {
	idx, err := store.GetIndex()
	if err != nil {
		return &IndexFile{}, err
	}
	return &idx, nil
}

func (i IndexFile) Add(md *Metadata, filename, baseURL, digest string) {
	u := filename
	if baseURL != "" {
		var err error
		u, err = urlutil.URLJoin(baseURL, filename)
		if err != nil {
			u = path.Join(baseURL, filename)
		}
	}
	d := &Document{
		URL:      u,
		Metadata: md,
		Digest:   digest,
		Created:  time.Now(),
	}
	// Check if entry already exists, if so append otherwise set
	if ee, ok := i.Entries[md.Name]; !ok {
		i.Entries[md.Name] = Documents{d}
	} else {
		i.Entries[md.Name] = append(ee, d)
	}
}
