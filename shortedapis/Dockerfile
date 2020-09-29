FROM golang:1.14-buster
ENV PROTOC_VERSION="3.13.0"
ENV GRPC_WEB_VERSION="1.0.7"

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    build-essential \
    autoconf \
    libtool \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN curl -L -o /tmp/protoc.zip https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-linux-x86_64.zip \
    && unzip /tmp/protoc.zip -d /usr/local/ -x "*.txt"

RUN curl -L -o /bin/protoc-gen-grpc-web https://github.com/grpc/grpc-web/releases/download/${GRPC_WEB_VERSION}/protoc-gen-grpc-web-${GRPC_WEB_VERSION}-linux-x86_64 \
    && chmod +x /bin/protoc-gen-grpc-web

RUN mkdir /build
WORKDIR /build
ADD go.mod .
ADD go.sum .
RUN go install \
  github.com/golang/protobuf/protoc-gen-go \
  github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway \
  github.com/envoyproxy/protoc-gen-validate \
  github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger

RUN go install \
    github.com/gogo/protobuf/proto \
    github.com/gogo/protobuf/jsonpb \
    github.com/gogo/protobuf/protoc-gen-gogo \
    github.com/gogo/protobuf/gogoproto

RUN go get github.com/gogo/protobuf/protoc-gen-gofast
    

RUN cat go.mod

CMD ["go","generate"]