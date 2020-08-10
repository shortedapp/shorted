locals {
    configPath = "../../parameters/${terraform.workspace}/values.yaml"
    configPathContent = fileexists(local.configPath) ? file(local.configPath) : "ConfigPathNotFound: true"
    configYAML = yamldecode(local.configPathContent)
    config = local.configYAML
}

module "function" {
    source = "../../../../../infrastructure/modules/function"
    global = local.config.global
    configuration = local.config.function
}