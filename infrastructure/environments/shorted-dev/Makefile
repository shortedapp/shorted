TOPLVL=../
WORKSPACE=shorted-dev
PROJECT_ID ?= shorted-dev-aba5688f
TF_CREDS=~/.config/gcloud/${PROJECT_ID}-terraform.json
-include $(TOPLVL)/common.mk


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