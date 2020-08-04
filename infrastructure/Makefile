
ENV ?= nonprod
USERNAME ?= ben
DOMAIN ?= shorted.com.au
login:
	gcloud auth login ${USERNAME}@${DOMAIN}
init:
	@make -C infrastructure/environments/$(ENV) init
plan:
	@make -C infrastructure/environments/$(ENV) plan
apply:
	@make -C infrastructure/environments/$(ENV) apply
## bootstrap infra
infrastructure.plan: init plan
infrastructure.apply: init plan apply
test:
	echo ${ENV}
