package main

import (
	"context"
	"fmt"

	v1 "github.com/shortedapp/shorted/shortedapis/pkg/watcher/v1"
	"google.golang.org/grpc"
)

func main() {
	creds := credentials.NewTLS(&tls.Config{
		InsecureSkipVerify: false,
	})

	opts := []grpc.DialOption{
		// grpc.WithTransportCredentials(creds),
		grpc.WithInsecure(),
	}
	conn, err := grpc.Dial("watcher-ak2zgjnhlq-ts.a.run.app:443", opts...)
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
