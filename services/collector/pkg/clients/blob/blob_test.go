package blob

import (
	"context"
	"testing"

	v1 "github.com/shortedapp/shorted/shortedapis/pkg/shorted/service/collector/v1"
	"github.com/stretchr/testify/assert"
)

func TestSeparatePathPath(t *testing.T) {
	bucket, file := separatePath("gs://bucket-name/my-folder/test/file.txt")

	assert.Equal(t, "gs://bucket-name", bucket)
	assert.Equal(t, "/my-folder/test/file.txt", file)
}

func TestBucketWrite(t *testing.T) {
	b, _ := New(context.Background(), "file://./testdata")
	println(b.bucketName)
	b.BucketWrite(context.Background(), "collector-bucket", []byte("test-output"), &v1.SourceMetadata{})
}
