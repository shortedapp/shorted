terraform {
    required_version = ">=0.12.29"
    # backend "gcs" {
    #     bucket = "shorted-np"
    # }
}

provider "google-beta" {
    region = "australia-southeast1"
    project = "shorted-np"
    version = "~>3.5"
}

provider "google" {
    region = "australia-southeast1"
    project = "shorted-np"
    version = "~>3.5"
}
