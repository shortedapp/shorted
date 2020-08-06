PROJECT_ID ?= shorted-np

login:
	gcloud config set ${PROJECT_ID}
	gcloud auth login
	gcloud auth application-default login

set.workspace: init
	terraform workspace new ${WORKSPACE} || terraform workspace select ${WORKSPACE}

init: 
	GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform init

plan: set.workspace
	GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform plan

apply: plan
	GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform apply

