package index

import (
	"time"

	"github.com/google/uuid"
)

type Info struct {
	ID          uuid.UUID
	Name        string
	Source      Source
	LastUpdated time.Time
}
