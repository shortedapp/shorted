ENV = dev
WORKSPACE ?= shorted-dev
DOMAIN ?= shorted.com.au
REGION=australia-southeast1
# where credentials will be stored
# name of admin project
PROJECT_ID=shorted-dev-aba5688f
TF_CREDS=~/.config/gcloud/${PROJECT_ID}-terraform.json
define load_env
	$(eval include .org.env)
endef
define delete_env
	rm -rf .org.env
endef
dependencies:

login:
	gcloud auth login ${USERNAME}@${DOMAIN}
## discovers ORG_ID and BILLING_ID and stores in org.env for usage in subsequent steps
gen-org-info:
	@ORG_ID=`gcloud organizations list --format=json | jq -r '.[0].name | split("/") | .[1]'`; \
	BILLING_ACCOUNT_ID=`gcloud beta billing accounts list --format=json | jq -r '.[0].name | split("/") | .[1]'`; \
	echo "ORG_ID=$$ORG_ID" > .org.env; \
	echo "BILLING_ACCOUNT_ID=$$BILLING_ACCOUNT_ID" >> .org.env

create.provider:
	@CONTENT=""" \
	terraform {\n \
	\trequired_version = \">=0.12.29\"\n \
	\tbackend \"gcs\" {\n \
	\t\tbucket  = \"tf-state-${PROJECT_ID}\"\n \
	\t\tprefix  = \"terraform/state\"\n \
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

set.workspace:
	@GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform workspace new ${WORKSPACE} || GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform workspace select ${WORKSPACE}

init: set.workspace
	@GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform init

plan: init 
	@GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform plan

apply: init plan
	@GOOGLE_APPLICATION_CREDENTIALS=${TF_CREDS} terraform apply

destroy: init
	terraform destroy

