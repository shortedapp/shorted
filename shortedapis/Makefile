
BUF_VERSION := 0.21.0
GRPC_GATEWAY_VERSION=v1.14.4
GOGO_PROTOBUF_VERSION=v1.3.1
UNAME_OS := $(shell uname -s)
UNAME_ARCH := $(shell uname -m)
# Buf will be cached to ~/.cache/buf-example.
CACHE_BASE := $(HOME)/.cache/$(PROJECT)
# This allows switching between i.e a Docker container and your local setup without overwriting.
CACHE := $(CACHE_BASE)/$(UNAME_OS)/$(UNAME_ARCH)
# The location where buf will be installed.
CACHE_BIN := $(CACHE)/bin
# Marker files are put into this directory to denote the current version of binaries that are installed.
CACHE_VERSIONS := $(CACHE)/versions

# Update the $PATH so we can use buf directly
export PATH := $(abspath $(CACHE_BIN)):$(PATH)
# Update GOBIN to point to CACHE_BIN for source installations
export GOBIN := $(abspath $(CACHE_BIN))
# This is needed to allow versions to be added to Golang modules with go get
export GO111MODULE := on

install:

# BUF points to the marker file for the installed version.
#
# If BUF_VERSION is changed, the binary will be re-downloaded.
BUF := $(CACHE_VERSIONS)/buf/$(BUF_VERSION)

$(BUF):
	@rm -f $(CACHE_BIN)/buf
	@mkdir -p $(CACHE_BIN)
	curl -sSL \
		"https://github.com/bufbuild/buf/releases/download/v$(BUF_VERSION)/buf-$(UNAME_OS)-$(UNAME_ARCH)" \
		-o "$(CACHE_BIN)/buf"
	chmod +x "$(CACHE_BIN)/buf"
	@rm -rf $(dir $(BUF))
	@mkdir -p $(dir $(BUF))
	@touch $(BUF)

deps:
	GO111MODULE=on go mod download
	mkdir -p third_party
	mkdir -p third_party/protoc-gen-swagger/options
	mkdir -p third_party/gogo 
	mkdir -p third_party/googleapis/google/api
	mkdir -p third_party/googleapis/google/api
	mkdir -p third_party/google/api
	mkdir -p third_party/google/rpc
	cp -r ${GOPATH}/pkg/mod/github.com/grpc-ecosystem/grpc-gateway@${GRPC_GATEWAY_VERSION}/third_party/googleapis/google third_party/
	cp ${GOPATH}/pkg/mod/github.com/grpc-ecosystem/grpc-gateway@${GRPC_GATEWAY_VERSION}/protoc-gen-swagger/options/annotations.proto third_party/protoc-gen-swagger/options
	cp ${GOPATH}/pkg/mod/github.com/grpc-ecosystem/grpc-gateway@${GRPC_GATEWAY_VERSION}/protoc-gen-swagger/options/openapiv2.proto third_party/protoc-gen-swagger/options
	cp -r ${GOPATH}/pkg/mod/github.com/gogo/protobuf@$(GOGO_PROTOBUF_VERSION)/gogoproto third_party/gogo

generate:
	docker build -t proto-builder .
	docker run -v ${PWD}:/build proto-builder