package index

type (
	FileIndex struct {
		Count     int
		Documents []Document
	}
	Document struct {
		Year   string
		Month  string
		Day    string
		URL    string
		Format string
	}
)
