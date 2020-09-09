package index

import (
	"time"

	"github.com/Masterminds/semver"
)

type Metadata struct {
	Name    string
	Year    string
	Month   string
	Day     string
	Format  string
	Version string
}

type Document struct {
	*Metadata `json:"metadata"`
	Created   time.Time `json:"created,omitempty"`
	Removed   bool      `json:"removed,omitempty"`
	Digest    string    `json:"digest,omitempty"`
	URL       string    `json:"url"`
}
type Documents []*Document

// Len returns the length.
func (d Documents) Len() int { return len(d) }

// Swap swaps the position of two items in the versions slice.
func (d Documents) Swap(i, j int) { d[i], d[j] = d[j], d[i] }

// Less returns true if the version of entry a is less than the version of entry b.
func (d Documents) Less(a, b int) bool {
	// Failed parse pushes to the back.
	i, err := semver.NewVersion(d[a].Version)
	if err != nil {
		return true
	}
	j, err := semver.NewVersion(d[b].Version)
	if err != nil {
		return false
	}
	return i.LessThan(j)
}
