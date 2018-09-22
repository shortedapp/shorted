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
	@cd elasticsearch; docker-compose up -d
## stop elasticsearch cluster
elasticsearch.down:
	@cd elasticsearch; docker-compose down
## restart elasticsearch cluster
elasticsearch.restart:
	@cd elasticsearch; docker-compose restart
## get elasticsearch cluster logs
elasticsearch.logs:
	@cd elasticsearch; docker-compose logs --tail 300 -f
## test elaasticsearch endpoint
elasticsearch.test:
	@curl localhost:9200
## intall nginx for CORS 
nginx.install:
	brew install nginx
## edit nginx config
nginx.edit:
	code proxy/nginx.conf
## install project related nginx config
nginx.configure:
	cp proxy/nginx.conf /usr/local/etc/nginx/nginx.conf
## restart nginx
nginx.restart:
	sudo nginx -s stop; sudo nginx
nginx.logs:
	tail -f /usr/local/var/log/nginx/access.log
## test nginx reverse proxy
nginx.test:
	@curl localhost:8080 -s -o /dev/null -w "%{http_code}"
	@curl localhost:8080/api/search -s -o /dev/null -w "%{http_code}"
## initial company elasticsearch index
index.init:
	cd cli/dbmanager; . env/bin/activate; python dbmanager.py -ci
## create/ingest index into elasticsearch
index.create:
	cd cli/dbmanager; . env/bin/activate; python dbmanager.py -i
## delete elasticsearch index
index.delete:
	cd cli/dbmanager; . env/bin/activate; python dbmanager.py -di
## recreate index (fresh index)
index.recreate:
	cd cli/dbmanager; . env/bin/activate; python dbmanager.py -ri
index.status:
	curl localhost:9200/_cat/indices


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
