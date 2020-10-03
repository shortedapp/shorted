PROJECT_ID ?= shorted-dev-aba5688f
ENV ?= dev 
REGION=australia-southeast1
SA_NAME=watcher
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
	gcloud iam service-accounts keys create ~/.config/gcloud/watcher.json \
  		--iam-account ${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
	gcloud auth activate-service-account --key-file ~/.config/gcloud/watcher.json

gcloud.activate:
	gcloud config configurations activate shorted-dev
	gcloud config set core/project shorted-dev-aba5688f
	gcloud config set run/platform managed
	gcloud auth login
# describe:
	
# 	gcloud functions describe --region ${REGION} --project ${PROJECT_ID} ingestor-dev-first
# s.deploy:
# 	serverless deploy --region=${REGION}

build.cli:
	go build -o bin/cli ./cmd/cli
run.cli: build.cli
	PROJECT_ID=${PROJECT_ID} bin/cli
run.build:
	docker build -t asia.gcr.io/${PROJECT_ID}/watcher:latest .
run.run: run.build
	docker run -p 8080:8080 asia.gcr.io/${PROJECT_ID}/watcher:latest 

run.publish: run.build
	docker push asia.gcr.io/${PROJECT_ID}/watcher:latest

run.deploy: run.publish
	gcloud run services update watcher \
	--image=asia.gcr.io/${PROJECT_ID}/watcher:latest \
	--service-account ${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com

run.test.grpc:
	grpcurl -v \
	-import-path ../../shortedapis/ \
	-import-path ../../shortedapis/third_party/ \
	-proto ../../shortedapis/shorted/watcher/v1/watcher.proto \
	watcher-ak2zgjnhlq-ts.a.run.app:443 \
	shorted.watcher.v1.WatchService/GetWatch
run.test.http:
	curl -XPOST -vvv https://watcher-ak2zgjnhlq-ts.a.run.app/api/v1/watch
	# curl -XPOST $(shell make get.run.url)/api/v1/watch
test:
	go test ./...
run: build
	PROJECT_ID=${PROJECT_ID} bin/watcher
build:
	go build -o bin/watcher ./cmd/watcher

deploy: zip infrastructure.create

redeploy: destroy deploy

destroy: infrastructure.destroy
	rm -rf index.zip


describe:
	make -C infra/environments/${ENV} show
zip:
	rm -rf index.zip
	cp cmd/gcf/function.go function.go
	zip	-r index.zip function.go pkg go.mod go.sum
	rm -rf function.go
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

invoke.test:
	curl -XPOST -vvv $(shell make get.url)/api/v1/watch 


invoke.local:
	curl localhost:8080 -d '{"source": { "url": "https://www.asx.com.au/asx/research/ASXListedCompanies.csv", "format": "csv"}, "sink": {"url": "gs://${PROJECT_ID}-stocks/asx/stocks.csv", "format": "csv"}}'
