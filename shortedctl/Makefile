
build:
	go build -o ./bin/shortedctl ./cmd/shortedctl/main.go

run.get: build
	./bin/shortedctl get watcher

run.describe: build
	./bin/shortedctl describe watcher ${ID}

run.create: build
	./bin/shortedctl create watcher -f hack/test/watcher.yaml

run.delete: build
	./bin/shortedctl delete watcher ${ID}

run.cd: build
	./bin/shortedctl create watcher -f hack/test/watcher.yaml

run.get: build
	./bin/shortedctl get watcher

