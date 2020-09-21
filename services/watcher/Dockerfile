

FROM golang:1.14.4-buster as builder

WORKDIR /src
ADD go.mod go.sum ./


# fetch dependencies
RUN go mod download
# RUN go get -d -v ./...
ADD . ./

ARG VERSION=dev

ARG LDFLAGS="\
  -X pkg.buildinfo.Version=${VERSION} \
  "
# build image
RUN go build -ldflags="${LDFLAGS}" \
    -mod=readonly -v \
    -o /src/app \
    /src/cmd/run/main.go


FROM gcr.io/distroless/base-debian10
LABEL maintainer="ben@shorted.com.au"

COPY --from=builder /src/app /

CMD [ "/app" ]

