package main

import (
	"context"
	"fmt"

	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
	"google.golang.org/grpc"
)

func main() {
	conn, err := grpc.Dial("australia-southeast1-shorted-dev-aba5688f.cloudfunctions.net:443", grpc.WithInsecure())
	if err != nil {
		fmt.Printf("error dailing: %v", err)
	}
	defer conn.Close()
	fmt.Printf("connection state: %v\n", conn.GetState().String())
	client := v1.NewWatchServiceClient(conn)

	watch, err := client.GetWatch(context.Background(), &v1.GetWatchRequest{})
	if err != nil {
		panic(fmt.Errorf("error fetching watch from client: %v", err))
	}
	fmt.Printf("watch: %v", watch)
}
