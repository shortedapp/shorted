package source

import (
	"context"
	"crypto/tls"
	"fmt"
	"net/url"

	"github.com/Masterminds/semver"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	collectorpb "github.com/shortedapp/shorted/shortedapis/pkg/shorted/service/collector/v1"
	watcherpb "github.com/shortedapp/shorted/shortedapis/pkg/shorted/service/watcher/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/protobuf/types/known/timestamppb"
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
		m.index.Entries.Documents[name] = &watcherpb.Documents{Document: []*watcherpb.DocumentDetails{d}}
	} else {
		m.index.Entries.Documents[name].Document = append(m.index.Entries.Documents[name].Document, ee.Document...)
	}
}

func (m *Manager) addDocumentDetailsWithUpdatedAt(d *watcherpb.DocumentDetails) {
	name := d.Metadata.Name
	if ee, ok := m.index.Entries.Documents[name]; !ok {
		d.Metadata.Version = semver.MustParse("v1.0.0").String()
		m.index.Entries.Documents[name] = &watcherpb.Documents{Document: []*watcherpb.DocumentDetails{d}}
	} else {
		m.index.Entries.Documents[name].Document = append(m.index.Entries.Documents[name].Document, ee.Document...)	
	}
	m.index.Entries.Documents[name].LastUpdated = timestamppb.Now()
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
func (m *Manager) Collect(s *watcherpb.WatcherDetails) (*Manager, error) {
	collectedIndex := NewManager()
	// Client
	config := &tls.Config{}
	conn, err := grpc.Dial("collector-ak2zgjnhlq-ts.a.run.app:443", grpc.WithTransportCredentials(credentials.NewTLS(config)))
	if err != nil {
		log.Errorf("error dialing: %v", err)
	}
	defer conn.Close()
	c := collectorpb.NewCollectorServiceClient(conn)

	for _, docs := range m.index.GetEntries().GetDocuments() {
		document := docs.GetDocument()[0]
		collectUrl, err := getUrl(document)
		if err != nil {
			return nil, err
		}
		log.Infof(context.TODO(), "collecting source: %s", collectUrl)
		resourceCollected, err := c.GetSource(context.TODO(), &collectorpb.GetSourceRequest{
			Url:    collectUrl,
			Format: document.Metadata.Format,
			Parser: s.Spec.Source.Parser})
		if err != nil {
			log.Errorf("error collecting source, error: %v", err)
		}
		log.Infof(context.TODO(), "resourceCollected:info:%+v", resourceCollected)
		collectedIndex.addDocumentDetailsWithUpdatedAt(document)
		break
	}
	return collectedIndex, nil
}
// UpdateIndex
// reconcile and update two index with newly discovered contents
func (m *Manager) MergeIndex(newIndex *Manager) error {
	// TODO: update index accordingly
	for key, docs := range newIndex.index.GetEntries().GetDocuments() {
		if _, ok := m.getLatestDocument(key); !ok {
			m.AddDocumentDetails(docs.Document[0])
		}

	}
	return nil
}

func (m *Manager) getLatestDocument(name string) (*watcherpb.DocumentDetails, bool) {
	ee, ok := m.index.Entries.Documents[name]

	if !ok {
		return nil, false
	}
	return ee.Document[len(ee.Document)-1], true
}

func getUrl(document *watcherpb.DocumentDetails) (string, error) {
	baseUrl, err := url.Parse(document.Url)
	if err != nil {
		return "", fmt.Errorf("error parsing base url: %v", document.Url)
	}

	collectUrl, err := baseUrl.Parse(document.Metadata.Name)
	if err != nil {
		return "", fmt.Errorf("error parsing document url: %v", document.Metadata.Name)
	}
	return collectUrl.String(), nil

}
