resource "random_id" "project_suffix" {
    byte_length = 4
}

resource "google_project" "project" {
  name       = var.global.project_name
  project_id = "${var.global.project_name}-${var.global.environment}-${random_id.project_suffix.hex}"
}