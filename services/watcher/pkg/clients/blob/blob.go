package blob

import (
	"context"
	"fmt"
	"io"
	"net/url"

	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	"gocloud.dev/blob"
	_ "gocloud.dev/blob/fileblob"
	"gocloud.dev/blob/gcsblob"
	_ "gocloud.dev/blob/gcsblob"
	"gocloud.dev/gcp"
)

type Blob struct {
	Client *gcp.HTTPClient
}

func New(ctx context.Context) (*Blob, error) {
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
	return &blob, nil
}

func (b *Blob) BucketWrite(path string, data []byte) error {
	bucketName, _ := separatePath(path)
	bucket, err := gcsblob.OpenBucket(context.Background(), b.Client, bucketName, nil)
	if err != nil {
		return fmt.Errorf("could not open bucket: %v", err)
	}
	defer bucket.Close()
	return nil
}

func BucketWrite(ctx context.Context, path string, data []byte) error {
	bucketName, filePath := separatePath(path)
	bucket, err := blob.OpenBucket(ctx, bucketName)
	if err != nil {
		return fmt.Errorf("could not open bucket: %v", err)
	}
	// Open the key "foo.txt" for writing with the default options.
	w, err := bucket.NewWriter(ctx, filePath, nil)
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
	log.Infof(ctx, "successful write to bucket [%s] at key [%s]", bucketName, filePath)
	
	defer bucket.Close()
	return nil
}

func separatePath(s string) (string, string) {
	u, _ := url.Parse(s)
	return fmt.Sprintf("%s://%s", u.Scheme, u.Host), u.Path
}
