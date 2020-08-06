.PHONY: gomodgen deploy delete
PROJECT_ID ?= shorted-dev-aba5688f
REGION=australia-southeast1
SA_NAME=functions-admin
GOOGLE_APPLICATION_CREDENTIALS="~/.config/gcloud/${SA_NAME}.json"
GOOGLE_PROJECT=${PROJECT_ID}

gomodgen:
	GO111MODULE=on go mod init

deploy:
	gcloud functions deploy Hello --runtime go113 --trigger-http
	gcloud functions add-iam-policy-binding ingestor-dev-first \
	--member="allUsers" \
	--role="roles/cloudfunctions.invoker"

delete:
	gcloud functions delete Hello --runtime go113 --trigger-http

get.credentials:
	gcloud iam service-accounts keys create ~/.config/gcloud/${SA_NAME}.json \
  		--iam-account ${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com

describe:
	
	gcloud functions describe --region ${REGION} --project ${PROJECT_ID} ingestor-dev-first
s.deploy:
	serverless deploy --region=${REGION}