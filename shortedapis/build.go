// Core 
//go:generate protoc --go_opt=paths=source_relative --go-grpc_opt=paths=source_relative -I proto/ -I third_party/ ./proto/shorted/api/v1/core.proto  --go_out=pkg --go-grpc_out=pkg  --validate_out=lang=go,paths=source_relative:pkg
// Watcher
//go:generate protoc --go_opt=paths=source_relative --go-grpc_opt=paths=source_relative ./proto/shorted/service/watcher/v1/watcher.proto -I proto/ -I third_party/ --go_out=pkg --go-grpc_out=pkg --validate_out=lang=go,paths=source_relative:pkg
//go:generate protoc --go_opt=paths=source_relative --go-grpc_opt=paths=source_relative --grpc-gateway_opt=paths=source_relative ./proto/shorted/service/watcher/v1/service.proto -I proto/ -I third_party/ --go_out=pkg --go-grpc_out=pkg --validate_out=lang=go,paths=source_relative:pkg --grpc-gateway_out=logtostderr=false:pkg
//    SWAGGER SPEC
//go:generate protoc ./proto/shorted/service/watcher/v1/service.proto -I proto/ -I third_party/ --swagger_out=logtostderr=false:swagger
// Collector 
//go:generate protoc --go_opt=paths=source_relative --go-grpc_opt=paths=source_relative ./proto/shorted/service/collector/v1/collector.proto -I proto/ -I third_party/ --go_out=pkg --go-grpc_out=pkg --validate_out=lang=go,paths=source_relative:pkg
//go:generate protoc --go_opt=paths=source_relative --go-grpc_opt=paths=source_relative --grpc-gateway_opt=paths=source_relative ./proto/shorted/service/collector/v1/service.proto -I proto/ -I third_party/ --go_out=pkg --go-grpc_out=pkg --validate_out=lang=go,paths=source_relative:pkg --grpc-gateway_out=logtostderr=false:pkg --swagger_out=logtostderr=false:pkg
//    SWAGGER SPEC
//go:generate protoc ./proto/shorted/service/collector/v1/service.proto -I proto/ -I third_party/ --swagger_out=logtostderr=false:swagger
package shortedapis
