# Ingestor

The ingestor service is responsible for processing data from the ASIC data store and transforming/enriching into final storage format for query components

## Getting Started

### Local

```bash
make invoke.local
```

### Deploy

This command will setup all required dependencies for the operation of the given cloud function, as well as zip and push the function for running. This is done via terraform. I can technically also be deployed more simply via the `gcloud functions ...` command.

```bash
make deploy
```


### Invoke

Once succesfully deployed, you can invoke the running function using the following entrypoint:

```bash
make invoke
```

## References

[1] https://www.serverless.com/framework/docs/providers/google/guide/functions/

[2] https://cloud.google.com/functions/docs/securing/managing-access-iam#allowing_unauthenticated_function_invocation

[3] https://cloud.google.com/functions/docs/first-go

[4] https://cloud.google.com/functions/docs/writing#structuring_source_code

[5] https://www.terraform.io/docs/providers/google/r/cloudfunctions_function.html

[7] https://stackoverflow.com/questions/54255485/how-can-i-use-a-sub-packages-with-go-on-google-cloud-functions

[8] https://cloud.google.com/functions/docs/concepts/go-runtime

[9] https://stackoverflow.com/questions/52075778/what-does-a-production-ready-google-cloud-function-look-like

[10] https://levelup.gitconnected.com/how-i-structure-cloud-functions-in-go-61e151b278ac

[11] https://www.youtube.com/watch?v=Zo1XMfCX9xc

[12] https://cloud.google.com/functions/docs/bestpractices/tips

### Go Code

[9] https://github.com/snowzach/blocc

[10] https://github.com/google/go-cloud/blob/master/samples/guestbook/main.go

### Performance

[11] https://research.lightstep.com/reports/google-cloud-storage