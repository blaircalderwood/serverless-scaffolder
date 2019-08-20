variable "name" {}

variable "repo_default_branch" {}

variable "force_artifact_destroy" {}

variable "environment" {
  type = "list"
}

variable "type" {
  type = "string"
}

variable "env" {
  type = "string"
}

variable "description" {
  description = "Description of build project"
}

variable "build_timeout" {
  description = "Timeout set for the build to run"
}

variable "projectroot" {
  description = "The root path element for SSM variables"
}

variable "sourcecode" {
  type = "list"
}

variable "common_tags" {
  type = "map"
}
