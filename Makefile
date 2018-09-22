SHELL := /bin/bash --rcfile ~/.bash_profile
.PHONY: help
# COLORS
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)
TARGET_MAX_CHAR_NUM=20
ES_HOST=localhost
ES_PORT=9200

## start elasticsearch cluster
elasticsearch.up:
	docker-compose -f ./elasticsearch/docker-compose.yaml up -d
elasticsearch.down:
	docker-compose -f ./elasticsearch/docker-compose.yaml down
elasticsearch.restart:
	docker-compose -f ./elasticsearch/docker-compose.yaml restart

index.init:
	cd cli/dbmanager; . env/bin/activate; python dbmanager.py -ci
index.create:
	cd cli/dbmanager; . env/bin/activate; python dbmanager.py -i
index.delete:
	cd cli/dbmanager; . env/bin/activate; python dbmanager.py -di
index.recreate:
	cd cli/dbmanager; . env/bin/activate; python dbmanager.py -ri


## Show help
help:
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\.\_0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)
