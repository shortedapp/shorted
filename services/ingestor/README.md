# Ingestor

The ingestor service is responsible for processing data from the ASIC data store and transforming/enriching into final storage format for query components

## Getting Started

### Local

```bash
make invoke.local
```

### Deploy

```bash
serverless deploy
```

## References

[1] https://www.serverless.com/framework/docs/providers/google/guide/functions/

[2] https://cloud.google.com/functions/docs/securing/managing-access-iam#allowing_unauthenticated_function_invocation

[3] https://cloud.google.com/functions/docs/first-go

[4] https://cloud.google.com/functions/docs/writing#structuring_source_code

[5] https://www.terraform.io/docs/providers/google/r/cloudfunctions_function.html