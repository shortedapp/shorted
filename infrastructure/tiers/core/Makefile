ENV = core
WORKSPACE ?= ${ENV}
USERNAME ?= ben
DOMAIN ?= shorted.com.au
REGION=australia-southeast1
# where credentials will be stored
# name of admin project
TF_ADMIN=omega-system
TF_ADMIN_CREDS=~/.config/gcloud/${TF_ADMIN}-terraform-admin.json
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
	\t\tbucket  = \"${TF_ADMIN}\"\n \
	\t\tprefix  = \"terraform/state\"\n \
	\t}\n \
	}\n \
	provider \"google-beta\" {\n \
	\tregion = \"${REGION}\"\n \
	\tproject = \"${TF_ADMIN}\"\n \
	\tversion = \"~> 3.5\"\n \
	\tcredentials = \"${TF_CREDS}\"\n \
	}\n \
	provider \"google\" {\n \
	\tregion = \"${REGION}\"\n \
	\tproject = \"${TF_ADMIN}\"\n \
	\tversion = \"~> 3.5\"\n \
	\tcredentials = \"${TF_CREDS}\"\n \
	}\n \
	"""; \
	echo $$CONTENT > _provider.tf

set.workspace:
	@GOOGLE_APPLICATION_CREDENTIALS=${TF_ADMIN_CREDS} terraform workspace new ${WORKSPACE} || GOOGLE_APPLICATION_CREDENTIALS=${TF_ADMIN_CREDS} terraform workspace select ${WORKSPACE}

init: set.workspace
	@GOOGLE_APPLICATION_CREDENTIALS=${TF_ADMIN_CREDS} terraform init

plan: init 
	@GOOGLE_APPLICATION_CREDENTIALS=${TF_ADMIN_CREDS} terraform plan

apply: init plan
	@GOOGLE_APPLICATION_CREDENTIALS=${TF_ADMIN_CREDS} terraform apply

get.projects: init
	@echo "projects within core include:"
	@GOOGLE_APPLICATION_CREDENTIALS=${TF_ADMIN_CREDS} terraform show	-json | jq -r '.values.root_module.child_modules[0].resources | map(select(.type=="google_project")) | map(.values.project_id)' | jq -r '.[]' | \
	while read i; do \
		echo $$i; \
	done

get.credentials.all:
	@echo "getting credentials for all core projects:"
	@GOOGLE_APPLICATION_CREDENTIALS=${TF_ADMIN_CREDS} terraform show	-json | jq -r '.values.root_module.child_modules[0].resources | map(select(.type=="google_project")) | map(.values.project_id)' | jq -r '.[]' | \
	while read project; do \
		gcloud iam service-accounts keys create ~/.config/gcloud/$$project-terraform.json \
  		--iam-account terraform@$$project.iam.gserviceaccount.com; \
		printf "✅"; \
	done


destroy: init
	terraform destroy

