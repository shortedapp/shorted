locals {
    serviceAccounts = {
        for serviceAccount, config in var.configuration.serviceAccounts: "${serviceAccount}" => merge({ roles = [],keyAdmins = []}, config)
    }
    saRoles = flatten([
        for serviceAccount, config in local.serviceAccounts: [
            for role in config.roles: {
                name = config.name
                role = role
            }
        ]
    ])
    saKeyAdmins = flatten([
       for serviceAccount, config in local.serviceAccounts: [
           for keyAdmin in config.keyAdmins: {
               name = config.name
               keyAdmin = keyAdmin
           }
       ]
    ])
}

data "google_project" "project" {

}

resource "google_service_account" "iam_sa" {
    for_each = {
        for sa, config in local.serviceAccounts: "${config.name}" => config
    }
    project = data.google_project.project.project_id
    account_id = each.value.name
    display_name = "SA/${var.global.project_name}/${var.global.environment}/${each.value.name}"
}

resource "google_project_iam_member" "iam_sa_role" {
    for_each = {
        for role in local.saRoles: "${role.name}.${role.role}" => role
    }
    project = data.google_project.project.project_id
    role = each.value.role
    member = "serviceAccount:${google_service_account.iam_sa[each.value.name].email}"
}

resource "google_service_account_iam_member" "iam_sa_keyadmin" {
    for_each = {
        for keyAdmin in local.saKeyAdmins: "${keyAdmin.name}.${keyAdmin.keyAdmin}" => keyAdmin
    }
    service_account_id = google_service_account.iam_sa[each.value.name].name
    role = "roles/iam.serviceAccountKeyAdmin"
    member = each.value.keyAdmin
}