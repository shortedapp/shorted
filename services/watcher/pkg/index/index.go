package index

import (
	"time"
)

// APIVersionV1 is the v1 API version for index and repository files.
const APIVersionV1 = "v1"

// Watch is the main index structure used to store information about the sources that watcher is scanning
type Watch struct {
	APIVersion string             `json:"apiVersion"`
	Generated  time.Time          `json:"generated"`
	Sources    map[string]*Source `json:"sources"`
}

// NewWatch initializes an index.
func New() *Watch {
	return &Watch{
		APIVersion: APIVersionV1,
		Generated:  time.Now(),
		Sources:    map[string]*Source{},
	}
}

// LoadWatch deserialises index from given store (i.e file, gcs etc)
func Load(store Storage) (*Watch, error) {
	idx, err := store.Get()
	if err != nil {
		return &Watch{}, err
	}
	return &idx, nil
}

func (w Watch) Get(source string) (*Source, bool) {
	if es, ok := w.Sources[source]; ok {
		return es, true
	}
	return &Source{}, false
}

func (w Watch) Add(source *Source) {
	w.Sources[source.Name] = source
}

func (w *Watch) EntriesCount() int {
	count := 0
	for _, source := range w.Sources {
		count += source.EntriesCount
	}
	return count
}

// Compare current index with a newly built index to discover additional content
func (w Watch) Compare(latestIndex Watch) *Watch {
	idx := New()
	for name, _ := range w.Sources {
		if es, ok := latestIndex.Get(name); ok {
			for entry, doc := range latestIndex.Sources[name].Entries {
				if _, ok := w.Sources[name].Entries[entry]; !ok {
					es.AddDocument(name, doc)
				}
			}
			idx.Add(es)
		}
	}
	return idx
}
