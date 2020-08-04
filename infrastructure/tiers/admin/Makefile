USERNAME ?= ben
DOMAIN ?= shorted.com.au
REGION=australia-southeast1
# where credentials will be stored
# name of admin project
TF_ADMIN=omega-system
TF_CREDS=~/.config/gcloud/${TF_ADMIN}-terraform-admin.json
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

create.project: gen-org-info
	$(call load_env)
	gcloud projects create ${TF_ADMIN} \
  	--organization ${ORG_ID} \
  	--set-as-default
	gcloud beta billing projects link ${TF_ADMIN} \
  	--billing-account ${BILLING_ACCOUNT_ID}
create.sa:
	gcloud iam service-accounts create terraform \
 	 --display-name "Terraform admin account"
	gcloud iam service-accounts keys create ${TF_CREDS} \
  	--iam-account terraform@${TF_ADMIN}.iam.gserviceaccount.com
set.iam.tf-state:
	gcloud projects add-iam-policy-binding ${TF_ADMIN} \
  	--member serviceAccount:terraform@${TF_ADMIN}.iam.gserviceaccount.com \
  	--role roles/viewer
	gcloud projects add-iam-policy-binding ${TF_ADMIN} \
	--member serviceAccount:terraform@${TF_ADMIN}.iam.gserviceaccount.com \
	--role roles/storage.admin
enable.apis:
	gcloud services enable cloudresourcemanager.googleapis.com
	gcloud services enable cloudbilling.googleapis.com
	gcloud services enable iam.googleapis.com
	gcloud services enable compute.googleapis.com
	gcloud services enable serviceusage.googleapis.com
set.iam.project-admin:
	gcloud organizations add-iam-policy-binding ${ORG_ID} \
  	--member serviceAccount:terraform@${TF_ADMIN}.iam.gserviceaccount.com \
  	--role roles/resourcemanager.projectCreator
	gcloud organizations add-iam-policy-binding ${ORG_ID} \
	--member serviceAccount:terraform@${TF_ADMIN}.iam.gserviceaccount.com \
	--role roles/billing.user
create.tf-bucket:
	@gsutil mb -p ${TF_ADMIN} gs://${TF_ADMIN} || echo "✅ bucket already exists"
	@gsutil versioning set on gs://${TF_ADMIN} || echo "✅ bucket versioning set"
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


bootstrap: create.project create.sa set.iam.tf-state enable.apis set.iam.project-admin create.tf-bucket