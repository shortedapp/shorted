variable "global" {
    type = object({
        project_name = string
        region = string
        environment = string
        domain = string
    })
}

variable "configuration" {
    type = any
}