package source

import (
	"context"
	"google.golang.org/grpc"
	"github.com/Masterminds/semver"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	watcherpb "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
	collectorpb "github.com/shortedapp/shorted/shortedapis/pkg/collector/v1"
)

type Manager struct {
	index *watcherpb.Index
}

func NewManager() *Manager {

	return &Manager{
		index: &watcherpb.Index{
			Entries: &watcherpb.Entries{
				Documents: make(map[string]*watcherpb.Documents),
			},
		},
	}
}



func (m *Manager) AddDocumentDetails(d *watcherpb.DocumentDetails) {
	name := d.Metadata.Name
	if ee, ok := m.index.Entries.Documents[name]; !ok {
		d.Metadata.Version = semver.MustParse("v1.0.0").String()
		m.index.Entries.Documents[name] = &v1.Documents{Document: []*v1.DocumentDetails{d}}
	} else {
		m.index.Entries.Documents[name].Document = append(m.index.Entries.Documents[name].Document, ee.Document...)
	}
}

func (m *Manager) SetCount(n int) {
	m.index.Count = int64(n)
}

func (m *Manager) GetIndex() *watcherpb.Index {
	return m.index
}

func (m *Manager) Difference(current *watcherpb.Index) *Manager {
	new := NewManager()
	count := 0
	for entry, docs := range m.index.GetEntries().GetDocuments() {
		// check if the entry in the latest index exists in current index,
		// if not then we add it to the new index
		if _, ok := current.GetEntries().GetDocuments()[entry]; !ok {
			new.index.Entries.Documents[entry] = docs
			count++
		}
	}
	new.SetCount(count)
	log.Infof(context.TODO(), "found %v new documents", count)
	return new
}

// Collect will fetch all documents found missing for the given syncronisation process
func(m *Manager) Collect(s *watcherpb.WatcherDetails) (bool, error) {
	conn, err := grpc.Dial("collector-ak2zgjnhlq-ts.a.run.app:443")
	if err != nil {
		log.Errorf("error dailing: %v", err)
	}
	defer conn.Close()
	c := collectorpb.NewCollectorServiceClient(conn)
	
	for _, docs := range m.index.GetEntries().GetDocuments() {
		document := docs.GetDocument()[0]
		c.GetSource(context.TODO(), &collectorpb.GetSourceRequest{
			Url: document.Url,
			Format: document.Metadata.Format,
			Parser: s.Spec.Source.Adapter})
	}
}
