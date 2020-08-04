PROJECT_ID ?= shorted-np

login:
	gcloud config set ${PROJECT_ID}
	gcloud auth login
	gcloud auth application-default login

set.workspace:
	terraform workspace new ${WORKSPACE} || terraform workspace select ${WORKSPACE}

init:
	terraform init

plan: init set.workspace
	terraform plan

apply: set.workspace
	terraform apply

destroy: set.workspace
	terraform destroy

