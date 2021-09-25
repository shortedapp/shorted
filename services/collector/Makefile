PROJECT_ID ?= shorted-dev-aba5688f
ENV ?= dev 
REGION=australia-southeast1
SA_NAME=collector
TF_CREDS=~/.config/gcloud/${SA_NAME}.json
GOOGLE_PROJECT=${PROJECT_ID}

# deploy:
# 	gcloud functions deploy Hello --runtime go113 --trigger-http
# 	gcloud functions add-iam-policy-binding ingestor-dev-first \
# 	--member="allUsers" \
# 	--role="roles/cloudfunctions.invoker"

# delete:
# 	gcloud functions delete Hello --runtime go113 --trigger-http

get.credentials:
	gcloud iam service-accounts keys create ~/.config/gcloud/collector.json \
  		--iam-account ${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
	gcloud auth activate-service-account --key-file ~/.config/gcloud/collector.json

# describe:
	
# 	gcloud functions describe --region ${REGION} --project ${PROJECT_ID} ingestor-dev-first
# s.deploy:
# 	serverless deploy --region=${REGION}
run: build
	PROJECT_ID=${PROJECT_ID} bin/collector

run.cli: build.cli
	PROJECT_ID=${PROJECT_ID} bin/cli
run.build:
	docker build -t asia.gcr.io/${PROJECT_ID}/collector:latest .
run.run: run.build
	docker run \
		-p 8080:8080 \
		-e GOOGLE_APPLICATION_CREDENTIALS=/src/.config/gcloud/watcher.json \
		-v ~/.config/gcloud/watcher.json:/src/.config/gcloud/watcher.json \
		asia.gcr.io/${PROJECT_ID}/collector:latest 

run.publish: run.build
	docker push asia.gcr.io/${PROJECT_ID}/collector:latest

run.deploy: run.publish
	gcloud beta run deploy collector \
	--image=asia.gcr.io/${PROJECT_ID}/collector:latest \
	--service-account ${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
	--use-http2 \
	--allow-unauthenticated

run.test.grpc:
	grpcurl -v \
	collector-ak2zgjnhlq-ts.a.run.app:443 \
	shorted.collector.v1.CollectorService/GetSource
build:
	go build -o bin/collector ./cmd/collector
test:
	go test ./...
run.cli:
	go run ./cmd/cli/main.go

deploy: zip infrastructure.create

redeploy: destroy deploy

destroy: infrastructure.destroy
	rm -rf index.zip


describe:
	make -C infra/environments/${ENV} show
zip:
	rm -rf index.zip
	zip	-r index.zip function.go cmd pkg go.mod go.sum
infrastructure.create:
	echo "creating infra for ${ENV}"
	make -C infra/environments/${ENV} create.provider
	make -C infra/environments/${ENV} apply
infrastructure.destroy:
	make -C infra/environments/${ENV} create.provider
	make -C infra/environments/${ENV} destroy

get.url:
	@make -C infra/environments/${ENV} get.url
invoke:
	curl -vvv $(shell make get.url) -d '{"source": { "url": "https://www.asx.com.au/asx/research/ASXListedCompanies.csv", "format": "csv"}, "sink": {"url": "gs://${PROJECT_ID}-stocks/asx/stocks.csv", "format": "csv"}}'

invoke.local:
	curl localhost:8080 -d '{"source": { "url": "https://www.asx.com.au/asx/research/ASXListedCompanies.csv", "format": "csv"}, "sink": {"url": "gs://${PROJECT_ID}-stocks/asx/stocks.csv", "format": "csv"}}'
