package gcs

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

type Store struct {
	bucket *blob.Bucket
	attrs  *blob.Attributes

	bucketName string
	indexPath  string
	Client     *gcp.HTTPClient
}

func NewStore(ctx context.Context, path string) (*Store, error) {
	bucketName, indexPath := separatePath(path)
	s := Store{
		bucketName: bucketName,
		indexPath:  indexPath,
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

func (s *Store) GetIndex() (index.IndexFile, error) {
	ctx := context.Background()
	bucket, err := blob.OpenBucket(ctx, s.bucketName)
	defer bucket.Close()
	if err != nil {
		return index.IndexFile{}, fmt.Errorf("could not open bucket: %v", err)
	}
	s.bucket = bucket
	attrs, err := bucket.Attributes(ctx, s.indexPath)
	if gcerrors.Code(err) == gcerrors.NotFound {
		return index.IndexFile{}, nil
	}
	s.attrs = attrs

	// Open the key "foo.txt" for reading with the default options.
	r, err := bucket.NewReader(ctx, s.indexPath, nil)
	defer r.Close()
	if err != nil {
		return index.IndexFile{}, fmt.Errorf("could not read from filepath: %s, err: %v", s.indexPath, err)
	}

	var idx index.IndexFile
	dec := json.NewDecoder(r)
	dec.Decode(&idx)
	return idx, nil
}

func (s *Store) PutIndex(idx *index.IndexFile) error {
	ctx := context.Background()
	bucket, err := blob.OpenBucket(ctx, s.bucketName)
	if err != nil {
		return fmt.Errorf("could not open bucket: %v", err)
	}
	// Open the key "foo.txt" for writing with the default options.
	idxBytes, err := json.Marshal(idx)
	if err != nil {
		log.Fatal(err)
	}
	writeErr := bucket.WriteAll(ctx, s.indexPath, idxBytes, &blob.WriterOptions{
		ContentType: "application/json",
		Metadata: map[string]string{
			"last-updated": time.Now().String(),
			"items":        strconv.FormatInt(int64(idx.EntriesCount), 10),
		},
	})
	if writeErr != nil {
		log.Fatal(writeErr)
		return writeErr
	}

	log.Infof(ctx, "successful write to bucket [%s] at key [%s]", s.bucketName, s.indexPath)

	defer bucket.Close()
	return nil
}

func separatePath(s string) (string, string) {
	u, _ := url.Parse(s)
	return fmt.Sprintf("%s://%s", u.Scheme, u.Host), u.Path
}
