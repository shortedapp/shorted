# ShortedAPIs

This section contains the API surface for shorted. 

## Development

We use a simple docker container with the required dependencies install to generate our grpc bindings, which is configured via the `build.go` file.

Run generation with:

```bash
make generate
```

## References

[1] https://github.com/gogo/grpc-example/blob/master/proto/example.proto

[2] https://github.com/harlow/go-micro-services

### validations

[3] https://github.com/envoyproxy/protoc-gen-validate

### (gogo.stdduration)

[4] https://github.com/gogo/protobuf

[5] https://github.com/gogo/protobuf/blob/master/extensions.md#more-canonical-go-structures

### grpc-gateway