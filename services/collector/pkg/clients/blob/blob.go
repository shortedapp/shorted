package blob

import (
	"context"
	"fmt"
	"net/url"
	"strconv"
	"time"

	"github.com/shortedapp/shorted/services/collector/pkg/log"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/shorted/service/collector/v1"
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

func (b *Blob) BucketWrite(ctx context.Context, path string, data []byte, metadata *v1.SourceMetadata) error {
	bucket, err := blob.OpenBucket(ctx, b.bucketName)
	if err != nil {
		return fmt.Errorf("could not open bucket: %v", err)
	}
	// Open the key "foo.txt" for writing with the default options.
	writeErr := bucket.WriteAll(ctx, path, data, &blob.WriterOptions{
		ContentType: "application/csv",
		Metadata:    translateMetadata(metadata),
	})
	if writeErr != nil {
		log.Fatal(writeErr)
		return writeErr
	}
	if writeErr != nil {
		log.Fatal(writeErr)
	}
	log.Infof(ctx, "successful write to bucket [%s] at key [%s]", b.bucketName, path)

	defer bucket.Close()
	return nil
}

func separatePath(s string) (string, string) {
	u, _ := url.Parse(s)
	return fmt.Sprintf("%s://%s", u.Scheme, u.Host), u.Path
}

func translateMetadata(metadata *v1.SourceMetadata) (m map[string]string) {
	m = make(map[string]string)
	timeNow := time.Now().String()
	m["created-at"], m["last-modified"] = timeNow, timeNow
	m["items"] = strconv.FormatInt(metadata.Size, 10)
	m["digest"] = metadata.Digest
	if lm, found := metadata.Headers["Last-Modified"]; found {
		m["last-modified"] = lm
	}
	if cl, found := metadata.Headers["Content-Length"]; found {
		m["content-length"] = cl
	}
	return m
}
