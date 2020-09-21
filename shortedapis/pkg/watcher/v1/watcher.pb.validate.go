// Code generated by protoc-gen-validate. DO NOT EDIT.
// source: shorted/watcher/v1/watcher.proto

package watcher

import (
	"bytes"
	"errors"
	"fmt"
	"net"
	"net/mail"
	"net/url"
	"regexp"
	"strings"
	"time"
	"unicode/utf8"

	"github.com/golang/protobuf/ptypes"
)

// ensure the imports are used
var (
	_ = bytes.MinRead
	_ = errors.New("")
	_ = fmt.Print
	_ = utf8.UTFMax
	_ = (*regexp.Regexp)(nil)
	_ = (*strings.Reader)(nil)
	_ = net.IPv4len
	_ = time.Duration(0)
	_ = (*url.URL)(nil)
	_ = (*mail.Address)(nil)
	_ = ptypes.DynamicAny{}
)

// define the regex for a UUID once up-front
var _watcher_uuidPattern = regexp.MustCompile("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")

// Validate checks the field values on WatcherDetails with the rules defined in
// the proto definition for this message. If any rules are violated, an error
// is returned.
func (m *WatcherDetails) Validate() error {
	if m == nil {
		return nil
	}

	if err := m._validateUuid(m.GetId()); err != nil {
		return WatcherDetailsValidationError{
			field:  "Id",
			reason: "value must be a valid UUID",
			cause:  err,
		}
	}

	if l := utf8.RuneCountInString(m.GetName()); l < 5 || l > 10 {
		return WatcherDetailsValidationError{
			field:  "Name",
			reason: "value length must be between 5 and 10 runes, inclusive",
		}
	}

	if m.GetSource() == nil {
		return WatcherDetailsValidationError{
			field:  "Source",
			reason: "value is required",
		}
	}

	if v, ok := interface{}(m.GetSource()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return WatcherDetailsValidationError{
				field:  "Source",
				reason: "embedded message failed validation",
				cause:  err,
			}
		}
	}

	if v, ok := interface{}(m.GetIndex()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return WatcherDetailsValidationError{
				field:  "Index",
				reason: "embedded message failed validation",
				cause:  err,
			}
		}
	}

	if _, ok := SyncStatus_name[int32(m.GetStatus())]; !ok {
		return WatcherDetailsValidationError{
			field:  "Status",
			reason: "value must be one of the defined enum values",
		}
	}

	return nil
}

func (m *WatcherDetails) _validateUuid(uuid string) error {
	if matched := _watcher_uuidPattern.MatchString(uuid); !matched {
		return errors.New("invalid uuid format")
	}

	return nil
}

// WatcherDetailsValidationError is the validation error returned by
// WatcherDetails.Validate if the designated constraints aren't met.
type WatcherDetailsValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e WatcherDetailsValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e WatcherDetailsValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e WatcherDetailsValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e WatcherDetailsValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e WatcherDetailsValidationError) ErrorName() string { return "WatcherDetailsValidationError" }

// Error satisfies the builtin error interface
func (e WatcherDetailsValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sWatcherDetails.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = WatcherDetailsValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = WatcherDetailsValidationError{}

// Validate checks the field values on Source with the rules defined in the
// proto definition for this message. If any rules are violated, an error is returned.
func (m *Source) Validate() error {
	if m == nil {
		return nil
	}

	if _, err := url.Parse(m.GetUrl()); err != nil {
		return SourceValidationError{
			field:  "Url",
			reason: "value must be a valid URI",
			cause:  err,
		}
	}

	if _, ok := _Source_Adapter_InLookup[m.GetAdapter()]; !ok {
		return SourceValidationError{
			field:  "Adapter",
			reason: "value must be in list [asic]",
		}
	}

	if v, ok := interface{}(m.GetInterval()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return SourceValidationError{
				field:  "Interval",
				reason: "embedded message failed validation",
				cause:  err,
			}
		}
	}

	return nil
}

// SourceValidationError is the validation error returned by Source.Validate if
// the designated constraints aren't met.
type SourceValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e SourceValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e SourceValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e SourceValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e SourceValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e SourceValidationError) ErrorName() string { return "SourceValidationError" }

// Error satisfies the builtin error interface
func (e SourceValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sSource.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = SourceValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = SourceValidationError{}

var _Source_Adapter_InLookup = map[string]struct{}{
	"asic": {},
}

// Validate checks the field values on Index with the rules defined in the
// proto definition for this message. If any rules are violated, an error is returned.
func (m *Index) Validate() error {
	if m == nil {
		return nil
	}

	if uri, err := url.Parse(m.GetUrl()); err != nil {
		return IndexValidationError{
			field:  "Url",
			reason: "value must be a valid URI",
			cause:  err,
		}
	} else if !uri.IsAbs() {
		return IndexValidationError{
			field:  "Url",
			reason: "value must be absolute",
		}
	}

	// no validation rules for DocumentCount

	if m.GetLastUpdated() == nil {
		return IndexValidationError{
			field:  "LastUpdated",
			reason: "value is required",
		}
	}

	return nil
}

// IndexValidationError is the validation error returned by Index.Validate if
// the designated constraints aren't met.
type IndexValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e IndexValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e IndexValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e IndexValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e IndexValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e IndexValidationError) ErrorName() string { return "IndexValidationError" }

// Error satisfies the builtin error interface
func (e IndexValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sIndex.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = IndexValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = IndexValidationError{}

// Validate checks the field values on SyncDetails with the rules defined in
// the proto definition for this message. If any rules are violated, an error
// is returned.
func (m *SyncDetails) Validate() error {
	if m == nil {
		return nil
	}

	if err := m._validateUuid(m.GetId()); err != nil {
		return SyncDetailsValidationError{
			field:  "Id",
			reason: "value must be a valid UUID",
			cause:  err,
		}
	}

	if l := utf8.RuneCountInString(m.GetName()); l < 5 || l > 10 {
		return SyncDetailsValidationError{
			field:  "Name",
			reason: "value length must be between 5 and 10 runes, inclusive",
		}
	}

	if _, ok := SyncStatus_name[int32(m.GetStatus())]; !ok {
		return SyncDetailsValidationError{
			field:  "Status",
			reason: "value must be one of the defined enum values",
		}
	}

	return nil
}

func (m *SyncDetails) _validateUuid(uuid string) error {
	if matched := _watcher_uuidPattern.MatchString(uuid); !matched {
		return errors.New("invalid uuid format")
	}

	return nil
}

// SyncDetailsValidationError is the validation error returned by
// SyncDetails.Validate if the designated constraints aren't met.
type SyncDetailsValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e SyncDetailsValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e SyncDetailsValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e SyncDetailsValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e SyncDetailsValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e SyncDetailsValidationError) ErrorName() string { return "SyncDetailsValidationError" }

// Error satisfies the builtin error interface
func (e SyncDetailsValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sSyncDetails.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = SyncDetailsValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = SyncDetailsValidationError{}
