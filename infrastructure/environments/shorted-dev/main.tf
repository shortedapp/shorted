locals {
    configSpec = yamldecode(file("../../parameters/values.spec.yaml"))
    configPath = "../../parameters/${terraform.workspace}/values.yaml"
    configPathContent = fileexists(local.configPath) ? file(local.configPath) : "ConfigPathNotFound: true"
    configYAML = yamldecode(local.configPathContent)
    config = merge(local.configSpec, local.configYAML)
}

module "iam" {
    source = "../../modules/iam"
    global = local.config.global
    configuration = local.config.iam
}