module github.com/shortedapp/shorted/services/watcher

go 1.14

require (
	contrib.go.opencensus.io/exporter/stackdriver v0.12.1
	github.com/GoogleCloudPlatform/functions-framework-go v1.1.0
	github.com/GoogleCloudPlatform/opentelemetry-operations-go/exporter/trace v0.2.2-0.20200804011553-7454a7ef9c13
	github.com/Masterminds/semver v1.5.0
	github.com/PuerkitoBio/goquery v1.5.1
	github.com/blang/semver v3.5.1+incompatible
	github.com/blendle/zapdriver v1.3.1
	github.com/cockroachdb/cmux v0.0.0-20170110192607-30d10be49292
	github.com/grpc-ecosystem/grpc-gateway v1.14.5
	github.com/shortedapp/shorted/shortedapis v0.0.0-20200909135456-8a2afe8f804b
	github.com/soheilhy/cmux v0.1.4
	github.com/stretchr/testify v1.6.1
	go.opencensus.io v0.22.4
	go.opentelemetry.io/otel v0.8.0
	go.uber.org/zap v1.15.0
	gocloud.dev v0.20.0
	golang.org/x/net v0.0.0-20200707034311-ab3426394381
	google.golang.org/grpc v1.31.0
)
