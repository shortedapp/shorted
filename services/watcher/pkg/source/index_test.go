package source

import (
	"testing"

	"github.com/brianvoe/gofakeit/v6"
	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/shorted/api/v1"
	watcherpb "github.com/shortedapp/shorted/shortedapis/pkg/shorted/service/watcher/v1"
	"github.com/stretchr/testify/assert"
)

func init() {
	log.InitLogger(config.DefaultConfig)
}
func TestNewStore(t *testing.T) {
	manager := NewManager()
	assert.Equal(t, manager, &Manager{
		index: &watcherpb.Index{
			Entries: &watcherpb.Entries{
				Documents: make(map[string]*watcherpb.Documents),
			},
		},
	}, "should be equal")
}

func TestDifference(t *testing.T) {

	base := NewManager()

	base.AddDocumentDetails(DocumentDetails())
	base.AddDocumentDetails(DocumentDetails())
	base.AddDocumentDetails(DocumentDetails())

	new := NewManager()

	new.AddDocumentDetails(DocumentDetails())
	new.AddDocumentDetails(DocumentDetails())
	new.AddDocumentDetails(DocumentDetails())

	diff := base.Difference(new.index)

	assert.Equal(t, diff.index.Count, int64(3))

	base.AddDocumentDetails(DocumentDetails(WithName("test")))
	new.AddDocumentDetails(DocumentDetails(WithName("test")))

	diff = base.Difference(new.index)

	assert.Equal(t, diff.index.Count, int64(3))

}

type Option func(*watcherpb.DocumentDetails)

func DocumentDetails(opts ...Option) *watcherpb.DocumentDetails {

	d := &watcherpb.DocumentDetails{
		Metadata: &watcherpb.DocumentMetadata{
			Name:   gofakeit.Name(),
			Date:   gofakeit.Date().Format("2006-05-22"),
			Format: v1.Format_CSV,
		},
		Url: gofakeit.URL(),
	}
	for _, opt := range opts {
		opt(d)
	}

	return d
}

func WithName(name string) Option {
	return func(d *watcherpb.DocumentDetails) {
		d.Metadata.Name = name
	}
}
