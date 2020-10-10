package source

import (
	"context"

	"github.com/Masterminds/semver"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
)

type Manager struct {
	index *v1.Index
}

func NewManager() *Manager {
	return &Manager{
		index: &v1.Index{
			Entries: &v1.Entries{
				Entries: make(map[string]*v1.Documents),
			},
		},
	}
}

func (m *Manager) AddDocumentDetails(d *v1.DocumentDetails) {
	name := d.Metadata.Name
	if ee, ok := m.index.Entries.Entries[name]; !ok {
		d.Metadata.Version = semver.MustParse("v1.0.0").String()
		m.index.Entries.Entries[name] = &v1.Documents{Document: []*v1.DocumentDetails{d}}
	} else {
		m.index.Entries.Entries[name].Document = append(m.index.Entries.Entries[name].Document, ee.Document...)
	}
}

func (m *Manager) SetCount(n int) {
	m.index.Count = int64(n)
}

func (m *Manager) GetIndex() *v1.Index {
	return m.index
}

func (m *Manager) Difference(current *v1.Index) *Manager {
	new := NewManager()
	count := 0
	for entry, docs := range m.index.GetEntries().GetEntries() {
		// check if the entry in the latest index exists in current index,
		// if not then we add it to the new index
		if _, ok := current.GetEntries().GetEntries()[entry]; !ok {
			new.index.Entries.Entries[entry] = docs
			count++
		}
	}
	new.SetCount(count)
	log.Infof(context.TODO(), "found %v new documents", count)
	return new
}
