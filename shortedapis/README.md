# ShortedAPIs

This section contains the API surface for shorted. 

## Development

We use a simple docker container with the required dependencies install to generate our grpc bindings, which is configured via the `build.go` file.

Run generation with:

```bash
make generate
```

# References

[1] https://github.com/gogo/grpc-example/blob/master/proto/example.proto
[2] https://github.com/harlow/go-micro-services
