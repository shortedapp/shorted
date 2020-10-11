// Watcher
//go:generate protoc ./proto/shorted/watcher/v1/watcher.proto -I proto/ -I third_party/ --gofast_out=plugins=grpc:pkg --validate_out=lang=go:pkg
//go:generate protoc ./proto/shorted/watcher/v1/watcher_service.proto -I proto/ -I third_party/ --gofast_out=plugins=grpc:pkg --validate_out=lang=go:pkg --grpc-gateway_out=logtostderr=false:pkg --swagger_out=logtostderr=false:pkg
// Collector 
//go:generate protoc ./proto/shorted/collector/v1/collector.proto -I proto/ -I third_party/ --gofast_out=plugins=grpc:pkg --validate_out=lang=go:pkg
//go:generate protoc ./proto/shorted/collector/v1/collector_service.proto -I proto/ -I third_party/ --gofast_out=plugins=grpc:pkg --validate_out=lang=go:pkg --grpc-gateway_out=logtostderr=false:pkg --swagger_out=logtostderr=false:pkg
package shortedapis
