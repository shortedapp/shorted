package asic

import (
	"context"
	"fmt"
	"net/http"

	"github.com/PuerkitoBio/goquery"
	"github.com/shortedapp/shorted/services/watcher/pkg/index"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
	"github.com/shortedapp/shorted/services/watcher/pkg/source"
	"github.com/shortedapp/shorted/services/watcher/sources/metadata"
)

type handler struct{}

// Parse source (https://asic.gov.au/regulatory-resources/markets/short-selling/short-position-reports-table/)
// using the bespoke mechanism defined and return the standardised source.FileIndex
// Here we are parsing the ASIC short position site which has the following HTML structure:
// the ASIC HTML structure is as follows
// 		section
// 			article
// 				div (header) [i.e 1020]
// 				div (content)
// 					article
// 						div (header) [i.e Jan]
// 						div (content)
// 							table
// 								tbody
// 									tr
// 										td (date)
// 										td (pdf)
// 										td (csv)
//

func (*handler) Parse(ctx context.Context, s *source.Source) (*index.IndexFile, error) {
	baseURL := s.BaseURL
	response, err := http.Get(s.URL)

	if err != nil {
		log.Errorf("unable to fetch contents for url %s", s.URL)
		return nil, err
	}
	defer response.Body.Close()
	idx := index.NewIndexFile()
	// Load the HTML document
	doc, err := goquery.NewDocumentFromReader(response.Body)
	if err != nil {
		log.Fatal(err)
	}
	count := 0

	doc.Find("section.pulldowns > article.pulldown-ordered").Each(func(i int, years *goquery.Selection) {
		years.ChildrenFiltered("div.pulldown-header").Each(func(i int, s *goquery.Selection) {
			year := s.Find("button > h2").Text()
			// fmt.Printf("year: %s\n", year)
			months := years.ChildrenFiltered("div.pulldown-content").Eq(i)
			months.Find("article.pulldown-ordered").Each(func(i int, m *goquery.Selection) {
				m.ChildrenFiltered("div.pulldown-header").Each(func(i int, s *goquery.Selection) {
					month := s.Find("button > h2").Text()
					// fmt.Printf("month: %s\n", month)

					days := m.ChildrenFiltered("div.pulldown-content").Eq(i)
					days.Find("table tbody tr").Each(func(i int, s *goquery.Selection) {
						row := s.Find("td")
						day := row.Eq(0).Text()
						filename, _ := row.Eq(2).Find("a").Attr("href")
						// fmt.Printf("day: %s\n", day)
						idx.Add(&index.Metadata{
							Name:   filename,
							Year:   year,
							Month:  month,
							Day:    day,
							Format: "csv",
						}, filename, baseURL, "")
						count++
					})
				})

			})

		})
	})
	idx.EntriesCount = count
	log.Infof(ctx, "%d %s documents pulled from %v", idx.EntriesCount, s.Format, s.URL)
	log.Response(ctx, response)

	return idx, nil
}

// GetInfo returns the Info associated with this source implementation.
func GetInfo() source.Info {
	info := metadata.GetInfo("asic")
	info.NewBuilder = func() source.HandlerBuilder { return &builder{} }
	return info
}

type builder struct{}

func (*builder) Validate() error { return nil }
func (b *builder) Build() (source.Handler, error) {
	return &handler{}, nil
}
