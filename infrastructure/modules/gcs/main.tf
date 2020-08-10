locals {
  bucketMembers = flatten([
    for bucket, bucket_config in var.configuration.buckets : [
      for user, user_config in bucket_config.users : [
        for member in user_config.members : [
          for role in member.roles : {
            name   = bucket_config.name
            user   = user_config.name
            role   = role
            member = member.meber

          }
        ]
      ]
    ]
  ])
  bucketUsers = flatten([
    for sa, sa_config in var.iam.serviceAccounts : [
      for bucket, bucket_config in var.configuration.buckets : [
        for user, user_config in bucket_config.users : {
          name = bucket_config.name
          user = user_config.name
        } if sa_config.name == user_config.name
      ]
    ]
  ])
}

module "iam" {
    source = "../iam"
    global = var.global
    configuration = var.iam
}

data "google_project" "project" {

}


resource "google_storage_bucket" "bucket" {
  for_each = {
    for bucket, config in var.configuration.buckets : "${config.name}" => config
  }
  name          = "${data.google_project.project.project_id}-${each.value.name}"
  location      = var.global.region
  project       = data.google_project.project.project_id
  storage_class = "REGIONAL"
}

resource "google_storage_bucket_iam_member" "bucket_members" {
  for_each = {
    for user in local.bucketMembers : "${user.name}.${user.user}.${user.member}.${user.role}" => user
  }
  bucket = google_storage_bucket.bucket[each.value.name].name
  role   = each.value.role
  member = each.value.member
}





resource "google_storage_bucket_iam_member" "bucket_users" {
  for_each = {
    for user in local.bucketUsers : "${user.name}.${user.user}" => user
  }
  bucket = google_storage_bucket.bucket[each.value.name].name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${module.iam.serviceAccounts[each.value.user].email}"
}
