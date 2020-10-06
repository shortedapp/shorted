package driver

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/url"
	"path"
	"strconv"
	"time"

	"github.com/mitchellh/mapstructure"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
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

func (g *GCS) Get(id string) (*v1.WatcherDetails, error) {
	ctx := context.Background()
	objectKey := getIndexKey(id)
	var watcher v1.WatcherDetails
	bucket, err := blob.OpenBucket(ctx, g.bucketName)
	defer bucket.Close()
	if err != nil {
		return &watcher, fmt.Errorf("could not open bucket: %v", err)
	}
	// Open the key "foo.txt" for reading with the default options.
	fmt.Printf("looking for object: %v", objectKey)
	r, err := bucket.NewReader(ctx, objectKey, nil)
	if err != nil {
		fmt.Printf("error: %v", err)
		return &watcher, ErrIndexNotFound
	}
	defer r.Close()
	
	dec := json.NewDecoder(r)
	dec.Decode(&watcher)
	return &watcher, nil
}

func (g *GCS) Update(idx *v1.WatcherDetails) error {
	ctx := context.Background()
	path := getIndexKey(idx.Metadata.Id)
	bucket, err := blob.OpenBucket(ctx, g.bucketName)
	if err != nil {
		return fmt.Errorf("could not open bucket: %v", err)
	}
	defer bucket.Close()
	// Open the key "foo.txt" for writing with the default options.
	idxBytes, err := json.Marshal(idx)
	if err != nil {
		log.Fatal(err)
	}
	writeErr := bucket.WriteAll(ctx, path, idxBytes, &blob.WriterOptions{
		ContentType: "application/json",
		Metadata: map[string]string{
			"last-updated": time.Now().String(),
			"items":        strconv.FormatInt(int64(idx.Spec.Index.Count), 10),
		},
	})
	if writeErr != nil {
		log.Fatal(writeErr)
		return writeErr
	}

	log.Infof(ctx, "successful write to bucket [%s] at key [%s]", g.bucketName, path)

	return nil
}

func (g *GCS) Create(idx *v1.WatcherDetails) error {
	ctx := context.Background()
	_, err := g.Get(idx.Metadata.Id)

	if err == nil {
		return fmt.Errorf("watcher already exists")
	}
	indexPath := getIndexKey(idx.Metadata.Id)
	bucket, err := blob.OpenBucket(ctx, g.bucketName)
	if err != nil {
		return fmt.Errorf("could not open bucket: %v", err)
	}
	defer bucket.Close()
	// Open the key "foo.txt" for writing with the default options.
	idxBytes, err := json.Marshal(idx)
	if err != nil {
		log.Fatal(err)
	}
	metadata, err := convertMetadata(idx.Metadata)
	if err != nil {
		return err
	}
	fmt.Printf("metadata; %v", metadata)
	writeErr := bucket.WriteAll(ctx, indexPath, idxBytes, &blob.WriterOptions{
		ContentType: "application/json",
		Metadata:    metadata,
	})
	if writeErr != nil {
		log.Fatal(writeErr)
		return writeErr
	}

	log.Infof(ctx, "successful write to bucket [%s] at key [%s]", g.bucketName, indexPath)
	return nil
}

func (g *GCS) List() ([]*v1.WatcherDetails, error) {
	ctx := context.Background()

	var watcherList []*v1.WatcherDetails
	bucket, err := blob.OpenBucket(ctx, g.bucketName)
	if err != nil {
		return nil, fmt.Errorf("could not open bucket: %v", err)
	}
	defer bucket.Close()
	iter := bucket.List(nil)
	for {
		var metadata v1.Metadata
		obj, err := iter.Next(ctx)
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, fmt.Errorf("error reading objects: %v", err)
		}
		m, err := getMetadata(ctx, bucket, obj.Key)
		if err != nil {
			return nil, err
		}
		fmt.Printf("metadata: %v", m)
		mapstructure.Decode(m, &metadata)
		count, _ := strconv.ParseInt(m["items"], 10, 64)
		watcherList = append(watcherList, &v1.WatcherDetails{
			Metadata: &metadata,
			Spec: &v1.Spec{
				Index: &v1.Index{
					Count: count,
				},
			},
		})
		if err != nil {
			return nil, fmt.Errorf("failed fetching object metadata: %v", err)
		}

		fmt.Printf("key: %v, dir: %v, metadata: %v", obj.Key, obj.IsDir, metadata)
	}

	return watcherList, nil
}

func (g *GCS) Delete(id string) (watcher *v1.WatcherDetails, err error) {
	ctx := context.Background()
	watcher, err = g.Get(id)
	if err != nil {
		return watcher, ErrIndexNotFound
	}
	//TODO(castlemilk): optimise bucket opening process to allow reusable bucket object between multiple calls like get + delete combo
	bucket, err := blob.OpenBucket(ctx, g.bucketName)
	defer bucket.Close()
	if err != nil {
		return watcher, fmt.Errorf("could not open bucket: %v", err)
	}
	err = bucket.Delete(ctx, getIndexKey(id))
	if err != nil {
		return watcher, ErrDeletingIndex
	}
	return watcher, nil
}

func (g *GCS) GetInfo(p string) (*v1.WatcherDetails, error) {
	return &v1.WatcherDetails{}, nil
}
func (g *GCS) Name() string {
	return GCSDriverName
}

func separatePath(s string) (string, string) {
	u, _ := url.Parse(s)
	return fmt.Sprintf("%s://%s", u.Scheme, u.Host), u.Path
}

func getMetadata(ctx context.Context, bucket *blob.Bucket, id string) (map[string]string, error) {
	attrs, err := bucket.Attributes(ctx, id)
	if gcerrors.Code(err) == gcerrors.NotFound {
		return nil, ErrIndexNotFound
	}

	return attrs.Metadata, nil

}

func convertMetadata(metadata *v1.Metadata) (result map[string]string, err error) {
	resultBytes, err := json.Marshal(metadata)
	json.Unmarshal(resultBytes, &result)
	fmt.Printf("result: %v", result)
	return
}

func getIndexKey(id string) string {
	return path.Join(id, "index.json")
}
