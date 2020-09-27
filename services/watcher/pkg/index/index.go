package index

import (
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
)

type Manager struct {
	index *v1.Index
}

func New() *Manager {
	return &Manager{
		index: &v1.Index{
			Entries: &v1.Entries{
				Entries: make(map[string]*v1.Documents),
			},
		},
	}
}

func (m *Manager) Add(d *v1.DocumentDetails) {

}

func (m *Manager) SetCount(n int) {
	m.index.Count = int64(n)
}

func (m *Manager) ToIndex() *v1.Index {
	return m.index
}
