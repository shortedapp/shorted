resource "random_id" "suffix" {
  byte_length = 4
}

resource "google_storage_bucket" "bucket" {
  name = "${var.configuration.name}-${random_id.suffix.hex}"
}



resource "google_storage_bucket_object" "archive" {
  name   = "index.zip"
  bucket = google_storage_bucket.bucket.name
  source = var.configuration.zipPath
}

data "google_service_account" "function_user" {
  account_id = var.configuration.name
}

resource "google_cloudfunctions_function" "function" {
  name        = var.configuration.name
  description = var.configuration.description
  runtime     = var.configuration.runtime

  available_memory_mb   = var.configuration.memory
  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.archive.name
  trigger_http          = var.configuration.triggerType == "http" ? true : false
  entry_point           = var.configuration.entrypoint
  environment_variables = {
      for envVar in var.configuration.envVars:
        envVar.name => envVar.value
  }
  service_account_email = data.google_service_account.function_user.email
}

# IAM entry for all users to invoke the function
resource "google_cloudfunctions_function_iam_member" "invoker" {
  count          = var.configuration.public ? 1 : 0
  project        = google_cloudfunctions_function.function.project
  region         = google_cloudfunctions_function.function.region
  cloud_function = google_cloudfunctions_function.function.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}
