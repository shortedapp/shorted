// // Copyright (c) 2020 Shorted Ltd Pty.
// //
// // Permission is hereby granted, free of charge, to any person obtaining a copy
// // of this software and associated documentation files (the "Software"), to deal
// // in the Software without restriction, including without limitation the rights
// // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// // copies of the Software, and to permit persons to whom the Software is
// // furnished to do so, subject to the following conditions:
// //
// // The above copyright notice and this permission notice shall be included in
// // all copies or substantial portions of the Software.
// //
// // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// // THE SOFTWARE.

// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        (unknown)
// source: shortsapi/v1/shorts.proto

package shortsv1

import (
	_ "github.com/shortedapp/shorted/shortedapis/pkg/core/v1"
	_ "github.com/shortedapp/shorted/shortedapis/pkg/validate"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// SyncStatus specifies the state of a given synchronisation request.
// Where a synchronisation state will correspond to a specfic source
type Status int32

const (
	Status_UNSPECIFIED Status = 0
	Status_PENDING     Status = 1
	Status_SUCCESS     Status = 2
	Status_FAILURE     Status = 3
)

// Enum value maps for Status.
var (
	Status_name = map[int32]string{
		0: "UNSPECIFIED",
		1: "PENDING",
		2: "SUCCESS",
		3: "FAILURE",
	}
	Status_value = map[string]int32{
		"UNSPECIFIED": 0,
		"PENDING":     1,
		"SUCCESS":     2,
		"FAILURE":     3,
	}
)

func (x Status) Enum() *Status {
	p := new(Status)
	*p = x
	return p
}

func (x Status) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (Status) Descriptor() protoreflect.EnumDescriptor {
	return file_shortsapi_v1_shorts_proto_enumTypes[0].Descriptor()
}

func (Status) Type() protoreflect.EnumType {
	return &file_shortsapi_v1_shorts_proto_enumTypes[0]
}

func (x Status) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use Status.Descriptor instead.
func (Status) EnumDescriptor() ([]byte, []int) {
	return file_shortsapi_v1_shorts_proto_rawDescGZIP(), []int{0}
}

// CollectDetails contains the set of information for a given collected source.
type ShortsDetails struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ApiVersion string `protobuf:"bytes,1,opt,name=apiVersion,proto3" json:"apiVersion,omitempty"`
	Status     Status `protobuf:"varint,4,opt,name=status,proto3,enum=shorted.service.shorts.v1.Status" json:"status,omitempty"`
}

func (x *ShortsDetails) Reset() {
	*x = ShortsDetails{}
	if protoimpl.UnsafeEnabled {
		mi := &file_shortsapi_v1_shorts_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ShortsDetails) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ShortsDetails) ProtoMessage() {}

func (x *ShortsDetails) ProtoReflect() protoreflect.Message {
	mi := &file_shortsapi_v1_shorts_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ShortsDetails.ProtoReflect.Descriptor instead.
func (*ShortsDetails) Descriptor() ([]byte, []int) {
	return file_shortsapi_v1_shorts_proto_rawDescGZIP(), []int{0}
}

func (x *ShortsDetails) GetApiVersion() string {
	if x != nil {
		return x.ApiVersion
	}
	return ""
}

func (x *ShortsDetails) GetStatus() Status {
	if x != nil {
		return x.Status
	}
	return Status_UNSPECIFIED
}

var File_shortsapi_v1_shorts_proto protoreflect.FileDescriptor

var file_shortsapi_v1_shorts_proto_rawDesc = []byte{
	0x0a, 0x19, 0x73, 0x68, 0x6f, 0x72, 0x74, 0x73, 0x61, 0x70, 0x69, 0x2f, 0x76, 0x31, 0x2f, 0x73,
	0x68, 0x6f, 0x72, 0x74, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x19, 0x73, 0x68, 0x6f,
	0x72, 0x74, 0x65, 0x64, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e, 0x73, 0x68, 0x6f,
	0x72, 0x74, 0x73, 0x2e, 0x76, 0x31, 0x1a, 0x17, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x65,
	0x2f, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a,
	0x12, 0x63, 0x6f, 0x72, 0x65, 0x2f, 0x76, 0x31, 0x2f, 0x63, 0x6f, 0x72, 0x65, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x22, 0x6a, 0x0a, 0x0d, 0x53, 0x68, 0x6f, 0x72, 0x74, 0x73, 0x44, 0x65, 0x74,
	0x61, 0x69, 0x6c, 0x73, 0x12, 0x1e, 0x0a, 0x0a, 0x61, 0x70, 0x69, 0x56, 0x65, 0x72, 0x73, 0x69,
	0x6f, 0x6e, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0a, 0x61, 0x70, 0x69, 0x56, 0x65, 0x72,
	0x73, 0x69, 0x6f, 0x6e, 0x12, 0x39, 0x0a, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x18, 0x04,
	0x20, 0x01, 0x28, 0x0e, 0x32, 0x21, 0x2e, 0x73, 0x68, 0x6f, 0x72, 0x74, 0x65, 0x64, 0x2e, 0x73,
	0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e, 0x73, 0x68, 0x6f, 0x72, 0x74, 0x73, 0x2e, 0x76, 0x31,
	0x2e, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x52, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x2a,
	0x40, 0x0a, 0x06, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x12, 0x0f, 0x0a, 0x0b, 0x55, 0x4e, 0x53,
	0x50, 0x45, 0x43, 0x49, 0x46, 0x49, 0x45, 0x44, 0x10, 0x00, 0x12, 0x0b, 0x0a, 0x07, 0x50, 0x45,
	0x4e, 0x44, 0x49, 0x4e, 0x47, 0x10, 0x01, 0x12, 0x0b, 0x0a, 0x07, 0x53, 0x55, 0x43, 0x43, 0x45,
	0x53, 0x53, 0x10, 0x02, 0x12, 0x0b, 0x0a, 0x07, 0x46, 0x41, 0x49, 0x4c, 0x55, 0x52, 0x45, 0x10,
	0x03, 0x42, 0xf8, 0x01, 0x0a, 0x1d, 0x63, 0x6f, 0x6d, 0x2e, 0x73, 0x68, 0x6f, 0x72, 0x74, 0x65,
	0x64, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e, 0x73, 0x68, 0x6f, 0x72, 0x74, 0x73,
	0x2e, 0x76, 0x31, 0x42, 0x0b, 0x53, 0x68, 0x6f, 0x72, 0x74, 0x73, 0x50, 0x72, 0x6f, 0x74, 0x6f,
	0x50, 0x01, 0x5a, 0x43, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x73,
	0x68, 0x6f, 0x72, 0x74, 0x65, 0x64, 0x61, 0x70, 0x70, 0x2f, 0x73, 0x68, 0x6f, 0x72, 0x74, 0x65,
	0x64, 0x2f, 0x73, 0x68, 0x6f, 0x72, 0x74, 0x65, 0x64, 0x61, 0x70, 0x69, 0x73, 0x2f, 0x70, 0x6b,
	0x67, 0x2f, 0x73, 0x68, 0x6f, 0x72, 0x74, 0x73, 0x61, 0x70, 0x69, 0x2f, 0x76, 0x31, 0x3b, 0x73,
	0x68, 0x6f, 0x72, 0x74, 0x73, 0x76, 0x31, 0xa2, 0x02, 0x03, 0x53, 0x53, 0x53, 0xaa, 0x02, 0x19,
	0x53, 0x68, 0x6f, 0x72, 0x74, 0x65, 0x64, 0x2e, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e,
	0x53, 0x68, 0x6f, 0x72, 0x74, 0x73, 0x2e, 0x56, 0x31, 0xca, 0x02, 0x19, 0x53, 0x68, 0x6f, 0x72,
	0x74, 0x65, 0x64, 0x5c, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x5c, 0x53, 0x68, 0x6f, 0x72,
	0x74, 0x73, 0x5c, 0x56, 0x31, 0xe2, 0x02, 0x25, 0x53, 0x68, 0x6f, 0x72, 0x74, 0x65, 0x64, 0x5c,
	0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x5c, 0x53, 0x68, 0x6f, 0x72, 0x74, 0x73, 0x5c, 0x56,
	0x31, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x1c,
	0x53, 0x68, 0x6f, 0x72, 0x74, 0x65, 0x64, 0x3a, 0x3a, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
	0x3a, 0x3a, 0x53, 0x68, 0x6f, 0x72, 0x74, 0x73, 0x3a, 0x3a, 0x56, 0x31, 0x62, 0x06, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_shortsapi_v1_shorts_proto_rawDescOnce sync.Once
	file_shortsapi_v1_shorts_proto_rawDescData = file_shortsapi_v1_shorts_proto_rawDesc
)

func file_shortsapi_v1_shorts_proto_rawDescGZIP() []byte {
	file_shortsapi_v1_shorts_proto_rawDescOnce.Do(func() {
		file_shortsapi_v1_shorts_proto_rawDescData = protoimpl.X.CompressGZIP(file_shortsapi_v1_shorts_proto_rawDescData)
	})
	return file_shortsapi_v1_shorts_proto_rawDescData
}

var file_shortsapi_v1_shorts_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_shortsapi_v1_shorts_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_shortsapi_v1_shorts_proto_goTypes = []interface{}{
	(Status)(0),           // 0: shorted.service.shorts.v1.Status
	(*ShortsDetails)(nil), // 1: shorted.service.shorts.v1.ShortsDetails
}
var file_shortsapi_v1_shorts_proto_depIdxs = []int32{
	0, // 0: shorted.service.shorts.v1.ShortsDetails.status:type_name -> shorted.service.shorts.v1.Status
	1, // [1:1] is the sub-list for method output_type
	1, // [1:1] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_shortsapi_v1_shorts_proto_init() }
func file_shortsapi_v1_shorts_proto_init() {
	if File_shortsapi_v1_shorts_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_shortsapi_v1_shorts_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ShortsDetails); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_shortsapi_v1_shorts_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_shortsapi_v1_shorts_proto_goTypes,
		DependencyIndexes: file_shortsapi_v1_shorts_proto_depIdxs,
		EnumInfos:         file_shortsapi_v1_shorts_proto_enumTypes,
		MessageInfos:      file_shortsapi_v1_shorts_proto_msgTypes,
	}.Build()
	File_shortsapi_v1_shorts_proto = out.File
	file_shortsapi_v1_shorts_proto_rawDesc = nil
	file_shortsapi_v1_shorts_proto_goTypes = nil
	file_shortsapi_v1_shorts_proto_depIdxs = nil
}
