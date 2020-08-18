package watcher

type ASIC struct {
	Documents []ASICShortDocument
}

type ASICShortDocument struct {
	Year string
	Month string
	Day string
	URL string
	Format string
} 