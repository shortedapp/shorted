package watcher

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/PuerkitoBio/goquery"
	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"github.com/shortedapp/shorted/services/watcher/pkg/log"
)

// Watcher - collecting arbitrary data and storing as required
type Watcher struct {
	// URL we will be collecting data from
	Source         Source `json:"source"`
	Pattern        Pattern
	Result         Result
	loggingEncoder string
	Context        context.Context
	Config         *config.Config
}
type Source struct {
	URL string `json"url"`
	// Format of file (will be used for parsing potential)
	Format string `json:"format"`
}
type Pattern struct {
	Value string
}
type Result struct {
	Data     []byte
	response *http.Response
	Status   string
}

// func New(ctx context.Context, cfg *config.Config, r io.ReadCloser) *Watcher {
func New(ctx context.Context, cfg *config.Config) *Watcher {
	var w Watcher
	w.Source.URL = "https://asic.gov.au/regulatory-resources/markets/short-selling/short-position-reports-table/"
	w.Source.Format = ".csv"
	w.Config = cfg
	w.Context = ctx
	return &w
}

func (w *Watcher) Parse() error {
	var err error
	w.Result.response, err = http.Get(w.Source.URL)
	if err != nil {
		log.Errorf("unable to fetch contents for url %s", w.Source.URL)
		return err
	}
	defer w.Result.response.Body.Close()
	var a ASIC
	// Load the HTML document
	doc, err := goquery.NewDocumentFromReader(w.Result.response.Body)
	if err != nil {
		log.Fatal(err)
	}
	count := 0

	/*	the ASIC HTML structure is as follows
		section
			article
				div (header) [i.e 1020]
				div (content)
					article
						div (header) [i.e Jan]
						div (content)
							table
								tbody
									tr
										td (date)
										td (pdf)
										td (csv)
	*/
	doc.Find("section.pulldowns > article.pulldown-ordered").Each(func(i int, years *goquery.Selection) {
		years.ChildrenFiltered("div.pulldown-header").Each(func(i int, s *goquery.Selection) {
			year := s.Find("button > h2").Text()
			fmt.Printf("year: %s\n", year)
			months := years.ChildrenFiltered("div.pulldown-content").Eq(i)
			months.Find("article.pulldown-ordered").Each(func(i int, m *goquery.Selection) {
				m.ChildrenFiltered("div.pulldown-header").Each(func(i int, s *goquery.Selection) {
					month := s.Find("button > h2").Text()
					fmt.Printf("month: %s\n", month)

					days := m.ChildrenFiltered("div.pulldown-content").Eq(i)
					days.Find("table tbody tr").Each(func(i int, s *goquery.Selection) {
						row := s.Find("td")
						day := row.Eq(0).Text()
						csv, _ := row.Eq(2).Find("a").Attr("href")
						fmt.Printf("day: %s\n", day)
						d := ASICShortDocument{Year: year,
							Month:  month,
							Day:    day,
							URL:    csv,
							Format: "csv",
						}
						a.Documents = append(a.Documents, d)
						count++
					})
				})

			})

		})
	})
	// fmt.Printf("asic docs: %v", a)
	log.Infof(w.Context, "%d %s documents pulled from %v", count, w.Source.Format, w.Source.URL)
	log.Response(w.Context, w.Result.response)
	w.Result.Status = "SUCCESS"

	return nil
}

func processBody(r io.ReadCloser) (Watcher, error) {
	var w Watcher
	body, err := ioutil.ReadAll(r)
	if err != nil {
		return w, err
	}
	err = json.Unmarshal(body, &w)
	if err != nil {
		return w, err
	}
	return w, nil
}
