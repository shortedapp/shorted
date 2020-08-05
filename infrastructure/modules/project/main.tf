locals {
  projectServices = flatten([
    for project, config in var.configuration: [
      for service in config.services: {
        project = config.name
        service = service
      }
    ]
  ])
  adminUsers = flatten([
    for project, config in var.configuration: [
      for user in config.admins: {
        project = config.name
        user = user
      }
    ]
  ]) 
}

data "google_organization" "org" {
  domain = var.global.domain
}

data "google_billing_account" "acct" {
  display_name = "My Billing Account"
}

resource "random_id" "project_suffix" {
    byte_length = 4
}

resource "google_project" "project" {
  for_each   = var.configuration
  name       = "${each.value.name}-${each.value.environment}"
  project_id = "${each.value.name}-${each.value.environment}-${random_id.project_suffix.hex}"
  org_id     = data.google_organization.org.org_id
  billing_account = data.google_billing_account.acct.id
}

resource "google_project_service" "service" {
  for_each = {
    for service in local.projectServices: "${service.project}.${service.service}" => service 
  }

  service = each.value.service

  project            = google_project.project[each.value.project].project_id
  disable_on_destroy = true
}

resource "google_service_account" "project_admin_sa" {
  for_each = var.configuration
  project = google_project.project[each.key].project_id
  account_id = "terraform"
  display_name = "Terraform/Admin"
}

resource "google_service_account_iam_member" "project_admin_permissions" {
  for_each = var.configuration
  service_account_id = google_service_account.project_admin_sa[each.key].name
  role = "roles/owner"
  member = "serviceAccount:${google_service_account.project_admin_sa[each.key].email}"
}

resource "google_project_iam_member" "project_user_admin_permissions" {
  for_each = {
    for user in local.adminUsers: "${user.project}.${user.user}" => user 
  }
  project = google_project.project[each.value.project].project_id 
  role = "roles/owner"
  member = "user:${each.value.user}@${var.global.domain}"
}
