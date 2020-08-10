terraform {
 	required_version = ">=0.12.29"
 	backend "gcs" {
 		bucket = "tf-state-shorted-dev-aba5688f"
 		prefix = "terraform/state"
 	}
 }
 provider "google-beta" {
 	region = "australia-southeast1"
 	project = "shorted-dev-aba5688f"
 	version = "~> 3.5"
 }
 provider "google" {
 	region = "australia-southeast1"
 	project = "shorted-dev-aba5688f"
 	version = "~> 3.5"
 }

