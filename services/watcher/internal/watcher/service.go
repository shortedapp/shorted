package watcher

import "context"

type Service struct {

}


func New(ctx context.Context) *Service {
	return &Service{}
}