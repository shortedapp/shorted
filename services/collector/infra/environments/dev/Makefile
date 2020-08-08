TOPLVL=../
SERVICE=ingestor
ENVIRONMENT=dev
WORKSPACE=${ENVIRONMENT}
PROJECT_ID ?= shorted-dev-aba5688f
REGION=australia-southeast1
SA_NAME=functions-admin
TF_CREDS=~/.config/gcloud/${SA_NAME}.json

create.provider:
	@CONTENT=""" \
	terraform {\n \
	\trequired_version = \">=0.12.29\"\n \
	\tbackend \"gcs\" {\n \
	\t\tbucket  = \"tf-state-${PROJECT_ID}\"\n \
	\t\tprefix  = \"terraform-functions/${SERVICE}/state\"\n \
	\t}\n \
	}\n \
	provider \"google-beta\" {\n \
	\tregion = \"${REGION}\"\n \
	\tproject = \"${PROJECT_ID}\"\n \
	\tversion = \"~> 3.5\"\n \
	}\n \
	provider \"google\" {\n \
	\tregion = \"${REGION}\"\n \
	\tproject = \"${PROJECT_ID}\"\n \
	\tversion = \"~> 3.5\"\n \
	}\n \
	"""; \
	echo $$CONTENT > _provider.tf


set.workspace: init
	@terraform workspace new ${WORKSPACE} > /dev/null 2>&1 || terraform workspace select ${WORKSPACE} > /dev/null 2>&1

init: 
	@GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform init > /dev/null 2>&1

plan: set.workspace
	GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform plan 

apply: plan
	GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform apply

destroy:
	GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform destroy

show: set.workspace
	@GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform show -json 
get.url: set.workspace
	@GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform show -json | jq -r '.values.root_module.child_modules[0].resources | map(select(.type=="google_cloudfunctions_function")) | .[0].values.https_trigger_url'
