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

	// no validation rules for ApiVersion

	if m.GetMetadata() == nil {
		return WatcherDetailsValidationError{
			field:  "Metadata",
			reason: "value is required",
		}
	}

	if v, ok := interface{}(m.GetMetadata()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return WatcherDetailsValidationError{
				field:  "Metadata",
				reason: "embedded message failed validation",
				cause:  err,
			}
		}
	}

	if m.GetSpec() == nil {
		return WatcherDetailsValidationError{
			field:  "Spec",
			reason: "value is required",
		}
	}

	if v, ok := interface{}(m.GetSpec()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return WatcherDetailsValidationError{
				field:  "Spec",
				reason: "embedded message failed validation",
				cause:  err,
			}
		}
	}

	if v, ok := interface{}(m.GetStatus()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return WatcherDetailsValidationError{
				field:  "Status",
				reason: "embedded message failed validation",
				cause:  err,
			}
		}
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

// Validate checks the field values on Metadata with the rules defined in the
// proto definition for this message. If any rules are violated, an error is returned.
func (m *Metadata) Validate() error {
	if m == nil {
		return nil
	}

	if err := m._validateUuid(m.GetId()); err != nil {
		return MetadataValidationError{
			field:  "Id",
			reason: "value must be a valid UUID",
			cause:  err,
		}
	}

	if l := utf8.RuneCountInString(m.GetName()); l < 5 || l > 10 {
		return MetadataValidationError{
			field:  "Name",
			reason: "value length must be between 5 and 10 runes, inclusive",
		}
	}

	// no validation rules for CreationTimestamp

	return nil
}

func (m *Metadata) _validateUuid(uuid string) error {
	if matched := _watcher_uuidPattern.MatchString(uuid); !matched {
		return errors.New("invalid uuid format")
	}

	return nil
}

// MetadataValidationError is the validation error returned by
// Metadata.Validate if the designated constraints aren't met.
type MetadataValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e MetadataValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e MetadataValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e MetadataValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e MetadataValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e MetadataValidationError) ErrorName() string { return "MetadataValidationError" }

// Error satisfies the builtin error interface
func (e MetadataValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sMetadata.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = MetadataValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = MetadataValidationError{}

// Validate checks the field values on Spec with the rules defined in the proto
// definition for this message. If any rules are violated, an error is returned.
func (m *Spec) Validate() error {
	if m == nil {
		return nil
	}

	if m.GetSource() == nil {
		return SpecValidationError{
			field:  "Source",
			reason: "value is required",
		}
	}

	if v, ok := interface{}(m.GetSource()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return SpecValidationError{
				field:  "Source",
				reason: "embedded message failed validation",
				cause:  err,
			}
		}
	}

	if v, ok := interface{}(m.GetIndex()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return SpecValidationError{
				field:  "Index",
				reason: "embedded message failed validation",
				cause:  err,
			}
		}
	}

	return nil
}

// SpecValidationError is the validation error returned by Spec.Validate if the
// designated constraints aren't met.
type SpecValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e SpecValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e SpecValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e SpecValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e SpecValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e SpecValidationError) ErrorName() string { return "SpecValidationError" }

// Error satisfies the builtin error interface
func (e SpecValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sSpec.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = SpecValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = SpecValidationError{}

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

	// no validation rules for Format

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

	// no validation rules for Count

	if m.GetLastUpdated() == nil {
		return IndexValidationError{
			field:  "LastUpdated",
			reason: "value is required",
		}
	}

	if v, ok := interface{}(m.GetEntries()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return IndexValidationError{
				field:  "Entries",
				reason: "embedded message failed validation",
				cause:  err,
			}
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

// Validate checks the field values on Entries with the rules defined in the
// proto definition for this message. If any rules are violated, an error is returned.
func (m *Entries) Validate() error {
	if m == nil {
		return nil
	}

	for key, val := range m.GetDocuments() {
		_ = val

		// no validation rules for Documents[key]

		if v, ok := interface{}(val).(interface{ Validate() error }); ok {
			if err := v.Validate(); err != nil {
				return EntriesValidationError{
					field:  fmt.Sprintf("Documents[%v]", key),
					reason: "embedded message failed validation",
					cause:  err,
				}
			}
		}

	}

	return nil
}

// EntriesValidationError is the validation error returned by Entries.Validate
// if the designated constraints aren't met.
type EntriesValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e EntriesValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e EntriesValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e EntriesValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e EntriesValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e EntriesValidationError) ErrorName() string { return "EntriesValidationError" }

// Error satisfies the builtin error interface
func (e EntriesValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sEntries.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = EntriesValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = EntriesValidationError{}

// Validate checks the field values on Documents with the rules defined in the
// proto definition for this message. If any rules are violated, an error is returned.
func (m *Documents) Validate() error {
	if m == nil {
		return nil
	}

	for idx, item := range m.GetDocument() {
		_, _ = idx, item

		if v, ok := interface{}(item).(interface{ Validate() error }); ok {
			if err := v.Validate(); err != nil {
				return DocumentsValidationError{
					field:  fmt.Sprintf("Document[%v]", idx),
					reason: "embedded message failed validation",
					cause:  err,
				}
			}
		}

	}

	return nil
}

// DocumentsValidationError is the validation error returned by
// Documents.Validate if the designated constraints aren't met.
type DocumentsValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e DocumentsValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e DocumentsValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e DocumentsValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e DocumentsValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e DocumentsValidationError) ErrorName() string { return "DocumentsValidationError" }

// Error satisfies the builtin error interface
func (e DocumentsValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sDocuments.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = DocumentsValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = DocumentsValidationError{}

// Validate checks the field values on DocumentDetails with the rules defined
// in the proto definition for this message. If any rules are violated, an
// error is returned.
func (m *DocumentDetails) Validate() error {
	if m == nil {
		return nil
	}

	if v, ok := interface{}(m.GetMetadata()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return DocumentDetailsValidationError{
				field:  "Metadata",
				reason: "embedded message failed validation",
				cause:  err,
			}
		}
	}

	if v, ok := interface{}(m.GetCreatedAt()).(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return DocumentDetailsValidationError{
				field:  "CreatedAt",
				reason: "embedded message failed validation",
				cause:  err,
			}
		}
	}

	// no validation rules for Removed

	// no validation rules for Digest

	if uri, err := url.Parse(m.GetUrl()); err != nil {
		return DocumentDetailsValidationError{
			field:  "Url",
			reason: "value must be a valid URI",
			cause:  err,
		}
	} else if !uri.IsAbs() {
		return DocumentDetailsValidationError{
			field:  "Url",
			reason: "value must be absolute",
		}
	}

	return nil
}

// DocumentDetailsValidationError is the validation error returned by
// DocumentDetails.Validate if the designated constraints aren't met.
type DocumentDetailsValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e DocumentDetailsValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e DocumentDetailsValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e DocumentDetailsValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e DocumentDetailsValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e DocumentDetailsValidationError) ErrorName() string { return "DocumentDetailsValidationError" }

// Error satisfies the builtin error interface
func (e DocumentDetailsValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sDocumentDetails.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = DocumentDetailsValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = DocumentDetailsValidationError{}

// Validate checks the field values on DocumentMetadata with the rules defined
// in the proto definition for this message. If any rules are violated, an
// error is returned.
func (m *DocumentMetadata) Validate() error {
	if m == nil {
		return nil
	}

	// no validation rules for Name

	// no validation rules for Date

	// no validation rules for Format

	// no validation rules for Version

	return nil
}

// DocumentMetadataValidationError is the validation error returned by
// DocumentMetadata.Validate if the designated constraints aren't met.
type DocumentMetadataValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e DocumentMetadataValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e DocumentMetadataValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e DocumentMetadataValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e DocumentMetadataValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e DocumentMetadataValidationError) ErrorName() string { return "DocumentMetadataValidationError" }

// Error satisfies the builtin error interface
func (e DocumentMetadataValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sDocumentMetadata.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = DocumentMetadataValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = DocumentMetadataValidationError{}

// Validate checks the field values on SyncStatus with the rules defined in the
// proto definition for this message. If any rules are violated, an error is returned.
func (m *SyncStatus) Validate() error {
	if m == nil {
		return nil
	}

	if _, ok := Status_name[int32(m.GetStatus())]; !ok {
		return SyncStatusValidationError{
			field:  "Status",
			reason: "value must be one of the defined enum values",
		}
	}

	return nil
}

// SyncStatusValidationError is the validation error returned by
// SyncStatus.Validate if the designated constraints aren't met.
type SyncStatusValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e SyncStatusValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e SyncStatusValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e SyncStatusValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e SyncStatusValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e SyncStatusValidationError) ErrorName() string { return "SyncStatusValidationError" }

// Error satisfies the builtin error interface
func (e SyncStatusValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sSyncStatus.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = SyncStatusValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = SyncStatusValidationError{}

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

	if _, ok := Status_name[int32(m.GetStatus())]; !ok {
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
