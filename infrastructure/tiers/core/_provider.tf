terraform {
 	required_version = ">=0.12.29"
 	backend "gcs" {
 		bucket = "omega-system"
 		prefix = "terraform/state"
 	}
 }
 provider "google-beta" {
 	region = "australia-southeast1"
 	project = "omega-system"
 	version = "~> 3.5"
 }
 provider "google" {
 	region = "australia-southeast1"
 	project = "omega-system"
 	version = "~> 3.5"
 }

