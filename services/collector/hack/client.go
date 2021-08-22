package main

import (
	"context"
	"crypto/tls"
	"fmt"

	v1 "github.com/shortedapp/shorted/shortedapis/pkg/collector/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func main() {
	creds := credentials.NewTLS(&tls.Config{
		// InsecureSkipVerify: false,
	})

	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(creds),
		// grpc.WithInsecure(),
	}
	conn, err := grpc.Dial("collector-ak2zgjnhlq-ts.a.run.app:443", opts...)
	if err != nil {
		fmt.Printf("error dailing: %v", err)
	}
	defer conn.Close()
	fmt.Printf("connection state: %v\n", conn.GetState().String())
	client := v1.NewCollectorServiceClient(conn)
	source := "https://asic.gov.au/Reports/Daily/2010/06/RR20100616-001-SSDailyAggShortPos.csv"
	watch, err := client.GetSource(context.Background(), &v1.GetSourceRequest{
		Url:    source,
		Format: v1.Format_CSV,
		Parser: v1.Parser_PARSER_SHORTS,
	})
	if err != nil {
		panic(fmt.Errorf("error fetching watch from client: %v", err))
	}
	fmt.Printf("watch: %v", watch)
}
