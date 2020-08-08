package log

import (
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/blendle/zapdriver"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func InitLogger() {

	logConfig := zap.NewProductionConfig()
	// Handle different logger encodings
	loggerEncoding := os.Getenv("LOGGING_ENCODER")
	switch loggerEncoding {
	case "stackdriver":
		logConfig.Encoding = "json"
		logConfig.EncoderConfig = zapdriver.NewDevelopmentEncoderConfig()
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

	fmt.Print("initialised logger")

}

func LogRequest(w http.ResponseWriter, r *http.Request, encoder string) {
	// If the remote IP is being proxied, use the real IP
	remoteIP := r.Header.Get("X-Forwarded-For")
	if remoteIP == "" {
		remoteIP = r.RemoteAddr
	}
	if encoder == "stackdriver" {
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
		fields := []zapcore.Field{
			zap.Int("status", http.StatusOK),
			zap.String("path", r.RequestURI),
			zap.String("method", r.Method),
			zap.String("package", "collector.http"),
		}
		zap.L().Info("HTTP Request", fields...)
	}

}

func Response(r *http.Response, encoder string) {
	// If the remote IP is being proxied, use the real IP
	remoteIP := r.Header.Get("X-Forwarded-For")
	if remoteIP == "" {
		remoteIP = r.Request.RemoteAddr
	}
	contentSize := r.Header.Get("Content-Length")
	if encoder == "stackdriver" {
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
		fields := []zapcore.Field{
			zap.Int("status", http.StatusOK),
			zap.String("path", r.Request.RequestURI),
			zap.String("method", r.Request.Method),
			zap.String("responseSize", contentSize),
			zap.String("package", "collector.http"),
		}
		zap.L().Info("Source - HTTP Response", fields...)
	}

}

func Infof(template string, args ...interface{}) {
	zap.S().Infof(template, args)
}

// Fatalf uses fmt.Sprintf to construct and log a message at fatal level.
func Fatalf(template string, args ...interface{}) {
	zap.S().Fatalf(template, args)
}

func Errorf(template string, args ...interface{}) {
	zap.S().Errorf(template, args)
}

func Fatal(msg string) {
	zap.S().Fatal(msg)
}
