locals {
    configSpec = yamldecode(file("../../parameters/values.spec.yaml"))
    configPath = "../../parameters/${terraform.workspace}/values.yaml"
    configPathContent = fileexists(local.configPath) ? file(local.configPath) : "ConfigPathNotFound: true"
    configYAML = yamldecode(local.configPathContent)
    config = local.configYAML
}

// TODO: this can be put back outside once tf 0.13 in place (module dependency requirements etc.)
# module "iam" {
#     source = "../../modules/iam"
#     global = local.config.global
#     configuration = local.config.iam
# }

module "gcs" {
    source = "../../modules/gcs"
    global = local.config.global
    configuration = local.config.gcs
    iam = local.config.iam
}