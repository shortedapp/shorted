package driver

import (
	"context"
	"encoding/json"
	"fmt"
	"net/url"
	"strconv"
	"time"

	"github.com/shortedapp/shorted/services/watcher/pkg/index"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	"gocloud.dev/blob"
	_ "gocloud.dev/blob/gcsblob"
	"gocloud.dev/gcerrors"
	"gocloud.dev/gcp"
)

var _ Driver = (*GCS)(nil)

const (
	GCSDriverName = "GCS"
)

type GCS struct {
	bucket *blob.Bucket
	attrs  *blob.Attributes

	bucketName string
	Client     *gcp.HTTPClient
}

// instantiate new GCS driver
func NewGCS(bucket string) (*GCS, error) {
	g := GCS{
		bucketName: bucket,
	}
	// Your GCP credentials.
	// See https://cloud.google.com/docs/authentication/production
	// for more info on alternatives.
	ctx := context.Background()
	creds, err := gcp.DefaultCredentials(ctx)
	if err != nil {
		return &g, err
	}

	// Create an HTTP client.
	// This example uses the default HTTP transport and the credentials
	// created above.
	client, err := gcp.NewHTTPClient(
		gcp.DefaultTransport(),
		gcp.CredentialsTokenSource(creds))
	if err != nil {
		return &g, err
	}
	g.Client = client

	return &g, nil
}

func (g *GCS) Get(id string) (*index.Watch, error) {
	ctx := context.Background()
	bucket, err := blob.OpenBucket(ctx, g.bucketName)
	defer bucket.Close()
	if err != nil {
		return &index.Watch{}, fmt.Errorf("could not open bucket: %v", err)
	}
	g.bucket = bucket
	attrs, err := bucket.Attributes(ctx, id)
	if gcerrors.Code(err) == gcerrors.NotFound {
		return &index.Watch{}, ErrIndexNotFound
	}
	g.attrs = attrs

	// Open the key "foo.txt" for reading with the default options.
	r, err := bucket.NewReader(ctx, id, nil)
	defer r.Close()
	if err != nil {
		return &index.Watch{}, ErrIndexNotFound
	}

	var idx index.Watch
	dec := json.NewDecoder(r)
	dec.Decode(&idx)
	return &idx, nil
}

func (g *GCS) Update(path string, idx *index.Watch) error {
	ctx := context.Background()
	bucket, err := blob.OpenBucket(ctx, g.bucketName)
	if err != nil {
		return fmt.Errorf("could not open bucket: %v", err)
	}
	// Open the key "foo.txt" for writing with the default options.
	idxBytes, err := json.Marshal(idx)
	if err != nil {
		log.Fatal(err)
	}
	writeErr := bucket.WriteAll(ctx, path, idxBytes, &blob.WriterOptions{
		ContentType: "application/json",
		Metadata: map[string]string{
			"last-updated": time.Now().String(),
			"items":        strconv.FormatInt(int64(idx.EntriesCount()), 10),
		},
	})
	if writeErr != nil {
		log.Fatal(writeErr)
		return writeErr
	}

	log.Infof(ctx, "successful write to bucket [%s] at key [%s]", g.bucketName, path)

	defer bucket.Close()
	return nil
}

func (f *GCS) Create(idx *index.Watch) error {

	return nil
}
func (g *GCS) Name() string {
	return GCSDriverName
}

func separatePath(s string) (string, string) {
	u, _ := url.Parse(s)
	return fmt.Sprintf("%s://%s", u.Scheme, u.Host), u.Path
}
