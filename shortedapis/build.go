// Watcher
//go:generate protoc ./shorted/watcher/v1/watcher.proto -I shorted/ -I third_party/ --go_out=plugins=grpc:pkg --validate_out=lang=go:pkg --grpc-gateway_out=logtostderr=true:pkg --swagger_out=logtostderr=true:pkg
package shortedapis
