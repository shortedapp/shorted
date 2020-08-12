package log

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"

	cloudtrace "github.com/GoogleCloudPlatform/opentelemetry-operations-go/exporter/trace"
	"github.com/blendle/zapdriver"
	"github.com/shortedapp/shorted/services/watcher/pkg/config"
	"go.opentelemetry.io/otel/api/global"
	"go.opentelemetry.io/otel/api/trace"
	"go.opentelemetry.io/otel/instrumentation/httptrace"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"contrib.go.opencensus.io/exporter/stackdriver"
	octrace "go.opencensus.io/trace"
)

var (
	loggingConfig *config.Config
	tr            trace.Tracer
)

func InitLogger(config *config.Config) {
	loggingConfig = config
	logConfig := zap.NewProductionConfig()
	// Handle different logger encodings
	switch loggingConfig.LoggingEncoder {
	case "stackdriver":
		logConfig.Encoding = "json"
		logConfig.EncoderConfig = zapdriver.NewDevelopmentEncoderConfig()
		// Create and register a OpenCensus Stackdriver Trace exporter.
		exporter, err := stackdriver.NewExporter(stackdriver.Options{
			ProjectID: loggingConfig.ProjectId,
		})
		if err != nil {
				log.Fatal(err)
		}
		octrace.RegisterExporter(exporter)
	default:
		logConfig.Encoding = "console"
		logConfig.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
		logConfig.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder

		// JSON Fields
		logConfig.EncoderConfig.MessageKey = "msg"
		logConfig.EncoderConfig.LevelKey = "level"
		logConfig.EncoderConfig.CallerKey = "caller"
	}

	// Settings
	logConfig.Development = true
	logConfig.DisableCaller = false

	// Build the logger
	globalLogger, _ := logConfig.Build()
	zap.ReplaceGlobals(globalLogger)
	_, flush, err := cloudtrace.InstallNewPipeline(
		[]cloudtrace.Option{
			cloudtrace.WithProjectID(loggingConfig.ProjectId),
			// other optional exporter options
		},
		// This example code uses sdktrace.AlwaysSample sampler to sample all traces.
		// In a production environment or high QPS setup please use ProbabilitySampler
		// set at the desired probability.
		// Example:
		// sdktrace.WithConfig(sdktrace.Config {
		//        DefaultSampler: sdktrace.ProbabilitySampler(0.0001),
		// })
		sdktrace.WithConfig(sdktrace.Config{DefaultSampler: sdktrace.AlwaysSample()}),
		// other optional provider options
	)
	if err != nil {
		log.Fatalf("cloudtrace.InstallNewPipeline: %v", err)
	}
	// before ending program, wait for all enqueued spans to be exported
	defer flush()

	// Create custom span.
	tr = global.TraceProvider().Tracer("shorted.com.au/collector")


	
}

func Request(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	// If the remote IP is being proxied, use the real IP
	remoteIP := r.Header.Get("X-Forwarded-For")
	if remoteIP == "" {
		remoteIP = r.RemoteAddr
	}
	attrs, _, spanCtx := httptrace.Extract(r.Context(), r)
	ctx, span := tr.Start(
		trace.ContextWithRemoteSpanContext(r.Context(), spanCtx),
		"hello",
		trace.WithAttributes(attrs...),
	)
	defer span.End()
	if loggingConfig.LoggingEncoder != "stackdriver" {
		fields := []zapcore.Field{
			zap.Int("status", http.StatusOK),
			zap.String("path", r.RequestURI),
			zap.String("method", r.Method),
			zap.String("package", "collector.http"),
		}
		zap.L().Info("HTTP Request", fields...)

	} else if span == nil {
		fields := []zapcore.Field{
			zapdriver.HTTP(&zapdriver.HTTPPayload{
				RequestMethod: r.Method,
				RequestURL:    r.RequestURI,
				RequestSize:   strconv.FormatInt(r.ContentLength, 10),
				Status:        http.StatusOK,
				UserAgent:     r.UserAgent(),
				RemoteIP:      remoteIP,
				Referer:       r.Referer(),
				Protocol:      r.Proto,
			}),
			zap.String("package", "collector.http"),
		}
		zap.L().Info("HTTP Request", fields...)

	} else {
		sCtx := span.SpanContext()
		tr := sCtx.TraceID.String()
		trace := fmt.Sprintf("projects/%s/traces/%s", loggingConfig.ProjectId, tr)
		fields := []zapcore.Field{
			zapdriver.HTTP(&zapdriver.HTTPPayload{
				RequestMethod: r.Method,
				RequestURL:    r.RequestURI,
				RequestSize:   strconv.FormatInt(r.ContentLength, 10),
				Status:        http.StatusOK,
				UserAgent:     r.UserAgent(),
				RemoteIP:      remoteIP,
				Referer:       r.Referer(),
				Protocol:      r.Proto,
			}),
			zap.String("package", "collector.http"),
			zap.String("Trace", trace),
		}
		zap.L().Info("HTTP Request", fields...)
	}

}

func Response(ctx context.Context, r *http.Response) {
	// If the remote IP is being proxied, use the real IP
	remoteIP := r.Header.Get("X-Forwarded-For")
	if remoteIP == "" {
		remoteIP = r.Request.RemoteAddr
	}
	span := trace.SpanFromContext(ctx)
	contentSize := r.Header.Get("Content-Length")
	if loggingConfig.LoggingEncoder != "stackdriver" {
		fields := []zapcore.Field{
			zap.Int("status", http.StatusOK),
			zap.String("path", r.Request.RequestURI),
			zap.String("method", r.Request.Method),
			zap.String("responseSize", contentSize),
			zap.String("package", "collector.http"),
		}
		zap.L().Info("Source - HTTP Response", fields...)
	} else if span == nil {
		fields := []zapcore.Field{
			zapdriver.HTTP(&zapdriver.HTTPPayload{
				RequestMethod: r.Request.Method,
				RequestURL:    r.Request.RequestURI,
				ResponseSize:  contentSize,
				Status:        http.StatusOK,
				RemoteIP:      remoteIP,
				Referer:       r.Request.Referer(),
				Protocol:      r.Proto,
			}),
			zap.String("package", "collector.http"),
		}
		zap.L().Info("Source - HTTP Response", fields...)
	} else {
		sCtx := span.SpanContext()
		tr := sCtx.TraceID.String()
		trace := fmt.Sprintf("projects/%s/traces/%s", loggingConfig.ProjectId, tr)
		fields := []zapcore.Field{
			zapdriver.HTTP(&zapdriver.HTTPPayload{
				RequestMethod: r.Request.Method,
				RequestURL:    r.Request.RequestURI,
				ResponseSize:  contentSize,
				Status:        http.StatusOK,
				RemoteIP:      remoteIP,
				Referer:       r.Request.Referer(),
				Protocol:      r.Proto,
			}),
			zap.String("package", "collector.http"),
			zap.String("Trace", trace),
		}
		zap.L().Info("Source - HTTP Response", fields...)
	}
}

func Infof(ctx context.Context, template string, args ...interface{}) {
	span := trace.SpanFromContext(ctx)
	if loggingConfig.LoggingEncoder != "stackdriver" {
		zap.S().Infof(template, args...)
	} else if span == nil {
		zap.S().Infof(template, args...)
	} else {
		sCtx := span.SpanContext()
		tr := sCtx.TraceID.String()
		trace := fmt.Sprintf("projects/%s/traces/%s", loggingConfig.ProjectId, tr)
		fields := []zapcore.Field{
			zap.String("Trace", trace),
		}
		zap.L().Info(fmt.Sprintf(template, args...), fields...)
	}
}

// Fatalf uses fmt.Sprintf to construct and log a message at fatal level.
func Fatalf(template string, args ...interface{}) {
	zap.S().Fatalf(template, args...)
}

func Errorf(template string, args ...interface{}) {
	zap.S().Errorf(template, args...)
}

func Fatal(msg interface{}) {
	zap.S().Fatal(msg)
}
