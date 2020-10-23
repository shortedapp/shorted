package blob

import (
	"context"
	"fmt"
	"io"
	"net/url"

	"github.com/shortedapp/shorted/services/collector/pkg/log"
	"gocloud.dev/blob"
	_ "gocloud.dev/blob/fileblob"
	_ "gocloud.dev/blob/gcsblob"
	"gocloud.dev/gcp"
)

type Blob struct {
	Client     *gcp.HTTPClient
	bucketName string
}

func New(ctx context.Context, bucketName string) (*Blob, error) {
	var blob Blob
	// Your GCP credentials.
	// See https://cloud.google.com/docs/authentication/production
	// for more info on alternatives.
	creds, err := gcp.DefaultCredentials(ctx)
	if err != nil {
		return &blob, err
	}

	// Create an HTTP client.
	// This example uses the default HTTP transport and the credentials
	// created above.
	client, err := gcp.NewHTTPClient(
		gcp.DefaultTransport(),
		gcp.CredentialsTokenSource(creds))
	if err != nil {
		return &blob, err
	}
	blob.Client = client
	blob.bucketName = bucketName
	return &blob, nil
}

func (b *Blob) BucketWrite(ctx context.Context, path string, data []byte) error {
	bucket, err := blob.OpenBucket(ctx, b.bucketName)
	if err != nil {
		return fmt.Errorf("could not open bucket: %v", err)
	}
	// Open the key "foo.txt" for writing with the default options.
	w, err := bucket.NewWriter(ctx, path, nil)
	if err != nil {
		return err
	}
	_, writeErr := io.WriteString(w, string(data))
	// Always check the return value of Close when writing.
	closeErr := w.Close()
	if writeErr != nil {
		log.Fatal(writeErr)
	}
	if closeErr != nil {
		log.Fatal(closeErr)
	}
	log.Infof(ctx, "successful write to bucket [%s] at key [%s]", b.bucketName, path)

	defer bucket.Close()
	return nil
}

func separatePath(s string) (string, string) {
	u, _ := url.Parse(s)
	return fmt.Sprintf("%s://%s", u.Scheme, u.Host), u.Path
}
