package gcs

import (
	"context"
	"encoding/binary"
	"fmt"
	"net/url"

	"github.com/shortedapp/shorted/services/watcher/pkg/index"
	"gocloud.dev/blob"
	_ "gocloud.dev/blob/gcsblob"
	"gocloud.dev/gcerrors"
	"gocloud.dev/gcp"
)

type Store struct {
	bucket *blob.Bucket
	attrs  *blob.Attributes

	path   string
	Client *gcp.HTTPClient
}

func NewStore(ctx context.Context, path string) (*Store, error) {
	s := Store{
		path: path,
	}
	// Your GCP credentials.
	// See https://cloud.google.com/docs/authentication/production
	// for more info on alternatives.
	creds, err := gcp.DefaultCredentials(ctx)
	if err != nil {
		return &s, err
	}

	// Create an HTTP client.
	// This example uses the default HTTP transport and the credentials
	// created above.
	client, err := gcp.NewHTTPClient(
		gcp.DefaultTransport(),
		gcp.CredentialsTokenSource(creds))
	if err != nil {
		return &s, err
	}
	s.Client = client

	return &s, nil
}

func (s *Store) GetIndex() (index.FileIndex, error) {
	ctx := context.Background()
	bucketName, filePath := separatePath(s.path)
	bucket, err := blob.OpenBucket(ctx, bucketName)
	defer bucket.Close()
	if err != nil {
		return index.FileIndex{}, fmt.Errorf("could not open bucket: %v", err)
	}
	s.bucket = bucket
	attrs, err := bucket.Attributes(ctx, filePath)
	if gcerrors.Code(err) == gcerrors.NotFound {
		return index.FileIndex{}, nil
	}
	s.attrs = attrs

	// Open the key "foo.txt" for reading with the default options.
	r, err := bucket.NewReader(ctx, filePath, nil)
	defer r.Close()
	if err != nil {
		return index.FileIndex{}, fmt.Errorf("could not read from filepath: %s, err: %v", filePath, err)
	}
	idx := index.FileIndex{}
	if err := binary.Read(r, binary.BigEndian, &idx); err != nil {
		return index.FileIndex{}, fmt.Errorf("binary.Read failed")
	}

	return idx, nil
}

func (s *Store) PutIndex(idx index.FileIndex) error {
	fmt.Println("updating index here")
	return nil
}

func separatePath(s string) (string, string) {
	u, _ := url.Parse(s)
	return fmt.Sprintf("%s://%s", u.Scheme, u.Host), u.Path
}
