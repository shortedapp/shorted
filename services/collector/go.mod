module github.com/shortedapp/shorted/services/collector

go 1.14

require (
	cloud.google.com/go/logging v1.0.0
	contrib.go.opencensus.io/exporter/stackdriver v0.13.4
	github.com/GoogleCloudPlatform/functions-framework-go v1.1.0
	github.com/GoogleCloudPlatform/opentelemetry-operations-go/exporter/trace v0.11.0
	github.com/alecthomas/assert v0.0.0-20170929043011-405dbfeb8e38
	github.com/alecthomas/colour v0.1.0 // indirect
	github.com/alecthomas/repr v0.0.0-20200325044227-4184120f674c // indirect
	github.com/blendle/zapdriver v1.3.1
	github.com/cloudevents/sdk-go v1.0.0 // indirect
	github.com/grpc-ecosystem/grpc-gateway v1.15.2 // indirect
	github.com/mattn/go-isatty v0.0.12 // indirect
	github.com/opentracing/opentracing-go v1.2.0 // indirect
	github.com/sergi/go-diff v1.1.0 // indirect
	github.com/shortedapp/shorted/services/watcher v0.0.0-20201011123239-d36cb55eebbe
	github.com/shortedapp/shorted/shortedapis v0.0.0-20201011061620-f87c79f3f937
	github.com/stretchr/testify v1.6.1
	go.opencensus.io v0.22.4
	go.opentelemetry.io/contrib/instrumentation/net/http/httptrace v0.11.0
	go.opentelemetry.io/otel v0.11.0
	go.opentelemetry.io/otel/sdk v0.11.0
	go.uber.org/zap v1.16.0
	gocloud.dev v0.20.0
	golang.org/x/tools v0.0.0-20201010145503-6e5c6d77ddcc // indirect
	google.golang.org/genproto v0.0.0-20201009135657-4d944d34d83c // indirect
)
