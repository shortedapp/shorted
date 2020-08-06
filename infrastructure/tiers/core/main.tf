locals {
    configSpec = yamldecode(file("../../parameters/values.spec.yaml"))
    configPath = "../../parameters/${terraform.workspace}/values.yaml"
    configPathContent = fileexists(local.configPath) ? file(local.configPath) : "ConfigPathNotFound: true"
    configYAML = yamldecode(local.configPathContent)
    config = merge(local.configYAML, local.configSpec)
}

module "project" {
    source = "../../modules/project"
    global = local.config.global
    configuration = local.config.projects
}