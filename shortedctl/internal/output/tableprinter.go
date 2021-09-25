package output

import (
	"fmt"
	"io"
	"reflect"
	"strings"
	"time"

	"github.com/liggitt/tabwriter"

	"github.com/shortedapp/shorted/shortedapis/pkg/shorted/service/watcher/v1"
	"github.com/shortedapp/shorted/shortedctl/internal/meta"
)

type printHandler struct {
	columnDefinitions []TableColumnDefinition
	printFunc         reflect.Value
}

var (
	defaultHandler = &printHandler{
		columnDefinitions: objectMetadataColumnDefinitions,
		printFunc:         reflect.ValueOf(printObjectMeta),
	}

	objectMetadataColumnDefinitions = []TableColumnDefinition{
		{Name: "Id", Type: "string"},
		{Name: "Name", Type: "string", Format: "name"},
		{Name: "Age", Type: "string"},
	}
)

type TableColumnDefinition struct {
	// name is a human readable name for the column.
	Name string `json:"name"`
	// type is an OpenAPI type definition for this column, such as number, integer, string, or
	// array.
	// See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types for more.
	Type string `json:"type"`
	// format is an optional OpenAPI type modifier for this column. A format modifies the type and
	// imposes additional rules, like date or time formatting for a string. The 'name' format is applied
	// to the primary identifier column which has type 'string' to assist in clients identifying column
	// is the resource name.
	// See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types for more.
	Format string `json:"format"`
	// description is a human readable description of this column.
	Description string `json:"description"`
	// priority is an integer defining the relative importance of this column compared to others. Lower
	// numbers are considered higher priority. Columns that may be omitted in limited space scenarios
	// should be given a higher priority.
	Priority int32 `json:"priority"`
}

// TableRow is an individual row in a table.
type TableRow struct {
	// cells will be as wide as the column definitions array and may contain strings, numbers (float64 or
	// int64), booleans, simple maps, lists, or null. See the type field of the column definition for a
	// more detailed description.
	Cells []interface{} `json:"cells"`
}

// PrintOptions struct defines a struct for various print options
type PrintOptions struct {
	IncludeHeaders bool
}

type HumanReadablePrinter struct {
	columns      []TableColumnDefinition
	options      PrintOptions
	printHeaders bool
	handler      *printHandler
}

func NewTablePrinter() *HumanReadablePrinter {
	printer := &HumanReadablePrinter{
		options: PrintOptions{
			IncludeHeaders: true,
		},
		handler: defaultHandler,
	}
	return printer
}

func (h *HumanReadablePrinter) PrintObj(obj interface{}, output io.Writer) error {
	w, found := output.(*tabwriter.Writer)
	if !found {
		w = GetNewTabWriter(output)
		output = w
		defer w.Flush()
	}
	rows, err := printObjectMeta(obj)
	if err != nil {
		return err
	}
	if h.options.IncludeHeaders {
		var headers []string
		for _, column := range h.handler.columnDefinitions {
			headers = append(headers, strings.ToUpper(column.Name))
		}
		printHeader(headers, output)
	}
	printRows(output, rows, h.options)
	return nil
}

func printHeader(columnNames []string, w io.Writer) error {
	if _, err := fmt.Fprintf(w, "%s\n", strings.Join(columnNames, "\t")); err != nil {
		return err
	}
	return nil
}

func printRows(output io.Writer, rows []TableRow, options PrintOptions) {
	for _, row := range rows {
		for i, cell := range row.Cells {
			if i != 0 {
				fmt.Fprint(output, "\t")
			}
			fmt.Fprint(output, cell)
		}
		output.Write([]byte("\n"))
	}

}
func printObjectMeta(obj interface{}) ([]TableRow, error) {

	switch reflect.TypeOf(obj).Kind() {
	case reflect.Slice:
		rows := make([]TableRow, 0, 16)
		s := reflect.ValueOf(obj)
		for i := 0; i < s.Len(); i++ {
			item, ok := s.Index(i).Interface().(*watcher.WatcherDetails)
			if !ok {
				return nil, fmt.Errorf("%v: item[%v]: Expected object, got %#v(%s)", obj, i, s.Index(i).Interface(), s.Index(i).Kind())
			}
			nestedRows, err := printObjectMeta(item)
			if err != nil {
				return nil, err
			}
			rows = append(rows, nestedRows...)
		}
		return rows, nil
	}
	m, err := meta.WatcherAccessor(obj)
	if err != nil {
		return nil, err
	}
	rows := make([]TableRow, 0, 1)
	row := TableRow{}
	row.Cells = append(row.Cells, m.GetMetadata().GetId(), m.GetMetadata().GetName(), translateTimestampSince(m.GetMetadata().GetCreationTimestamp()))
	rows = append(rows, row)
	return rows, nil
}

// translateTimestampSince returns the elapsed time since timestamp in
// human-readable approximation.
func translateTimestampSince(s string) string {
	timestamp, err := time.Parse(time.RFC3339, s)
	if err != nil {
		return "<unknown>"
	}
	if timestamp.IsZero() {
		return "<unknown>"
	}

	return humanDuration(time.Since(timestamp))
}

// HumanDuration returns a succint representation of the provided duration
// with limited precision for consumption by humans. It provides ~2-3 significant
// figures of duration.
func humanDuration(d time.Duration) string {
	// Allow deviation no more than 2 seconds(excluded) to tolerate machine time
	// inconsistence, it can be considered as almost now.
	if seconds := int(d.Seconds()); seconds < -1 {
		return fmt.Sprintf("<invalid>")
	} else if seconds < 0 {
		return fmt.Sprintf("0s")
	} else if seconds < 60*2 {
		return fmt.Sprintf("%ds", seconds)
	}
	minutes := int(d / time.Minute)
	if minutes < 10 {
		s := int(d/time.Second) % 60
		if s == 0 {
			return fmt.Sprintf("%dm", minutes)
		}
		return fmt.Sprintf("%dm%ds", minutes, s)
	} else if minutes < 60*3 {
		return fmt.Sprintf("%dm", minutes)
	}
	hours := int(d / time.Hour)
	if hours < 8 {
		m := int(d/time.Minute) % 60
		if m == 0 {
			return fmt.Sprintf("%dh", hours)
		}
		return fmt.Sprintf("%dh%dm", hours, m)
	} else if hours < 48 {
		return fmt.Sprintf("%dh", hours)
	} else if hours < 24*8 {
		h := hours % 24
		if h == 0 {
			return fmt.Sprintf("%dd", hours/24)
		}
		return fmt.Sprintf("%dd%dh", hours/24, h)
	} else if hours < 24*365*2 {
		return fmt.Sprintf("%dd", hours/24)
	} else if hours < 24*365*8 {
		dy := int(hours/24) % 365
		if dy == 0 {
			return fmt.Sprintf("%dy", hours/24/365)
		}
		return fmt.Sprintf("%dy%dd", hours/24/365, dy)
	}
	return fmt.Sprintf("%dy", int(hours/24/365))
}
