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

[10.1] https://github.com/philips/grpc-gateway-example/blob/master/cmd/serve.go

### Muxing

[3] https://github.com/Gonzih/go-google-functions-demo/blob/master/function.go

[4] https://github.com/MartinSahlen/go-cloud-fn

[5] https://www.clarifai.com/blog/muxing-together-grpc-and-http-traffic-with-grpc-gateway

### Performance

[11] https://research.lightstep.com/reports/google-cloud-storage

### Microservice repos

[12.1] https://github.com/harlow/go-micro-services

[12.2] https://github.com/jaegertracing/jaeger

[12.3] https://github.com/GoogleCloudPlatform/gifinator

[12.4] https://github.com/mortenson/grpc-game-example

### CloudRun

[13] https://ahmet.im/blog/knative-api-client/

### ASIC

[a.1] https://asic.gov.au/regulatory-resources/markets/short-selling/short-selling-reports-notice/
[a.2] https://asic.gov.au/Reports/Daily/2020/08/RR20200804-001-SSDailyAggShortPos.csv
[a.3] https://asic.gov.au/Reports/YTD/2020/RR20200804-001-SSDailyYTD.csv
[a.4] 

### HTML 

[b.1] https://github.com/PuerkitoBio/goquery

### ASX Stock Data

[c.1] https://www.alphavantage.co/documentation/
