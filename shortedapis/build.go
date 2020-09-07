// Watcher
//go:generate protoc ./shorted/watcher/v1/watcher.proto   -I shorted/ -I third_party/ --go_out=plugins=grpc:pkg --grpc-gateway_out=logtostderr=true:pkg
package shortedapis
