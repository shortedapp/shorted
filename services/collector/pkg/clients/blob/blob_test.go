package blob

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSeparatePathPath(t *testing.T) {
	bucket, file := separatePath("gs://bucket-name/my-folder/test/file.txt")

	assert.Equal(t, "gs://bucket-name", bucket)
	assert.Equal(t, "/my-folder/test/file.txt", file)
}

func TestBucketWrite(t *testing.T) {

	assert.NoError(t, BucketWrite(context.Background(), "file:///testdata/collector-bucket", []byte("test-output")))
}
