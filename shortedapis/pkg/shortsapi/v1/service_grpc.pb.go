// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package shortsv1

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ShortsServiceClient is the client API for ShortsService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ShortsServiceClient interface {
	// A unary RPC used to collect a source
	GetShortsLatest(ctx context.Context, in *GetLatestShortsRequest, opts ...grpc.CallOption) (*GetShortsResponse, error)
}

type shortsServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewShortsServiceClient(cc grpc.ClientConnInterface) ShortsServiceClient {
	return &shortsServiceClient{cc}
}

func (c *shortsServiceClient) GetShortsLatest(ctx context.Context, in *GetLatestShortsRequest, opts ...grpc.CallOption) (*GetShortsResponse, error) {
	out := new(GetShortsResponse)
	err := c.cc.Invoke(ctx, "/shorted.service.shorts.v1.ShortsService/GetShortsLatest", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ShortsServiceServer is the server API for ShortsService service.
// All implementations must embed UnimplementedShortsServiceServer
// for forward compatibility
type ShortsServiceServer interface {
	// A unary RPC used to collect a source
	GetShortsLatest(context.Context, *GetLatestShortsRequest) (*GetShortsResponse, error)
	mustEmbedUnimplementedShortsServiceServer()
}

// UnimplementedShortsServiceServer must be embedded to have forward compatible implementations.
type UnimplementedShortsServiceServer struct {
}

func (UnimplementedShortsServiceServer) GetShortsLatest(context.Context, *GetLatestShortsRequest) (*GetShortsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetShortsLatest not implemented")
}
func (UnimplementedShortsServiceServer) mustEmbedUnimplementedShortsServiceServer() {}

// UnsafeShortsServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ShortsServiceServer will
// result in compilation errors.
type UnsafeShortsServiceServer interface {
	mustEmbedUnimplementedShortsServiceServer()
}

func RegisterShortsServiceServer(s grpc.ServiceRegistrar, srv ShortsServiceServer) {
	s.RegisterService(&ShortsService_ServiceDesc, srv)
}

func _ShortsService_GetShortsLatest_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetLatestShortsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ShortsServiceServer).GetShortsLatest(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/shorted.service.shorts.v1.ShortsService/GetShortsLatest",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ShortsServiceServer).GetShortsLatest(ctx, req.(*GetLatestShortsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// ShortsService_ServiceDesc is the grpc.ServiceDesc for ShortsService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ShortsService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "shorted.service.shorts.v1.ShortsService",
	HandlerType: (*ShortsServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetShortsLatest",
			Handler:    _ShortsService_GetShortsLatest_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "shortsapi/v1/service.proto",
}