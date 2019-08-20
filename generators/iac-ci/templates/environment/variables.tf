variable "name" {}

variable "reponame" {}

variable "repo_default_branch" {}

variable "force_artifact_destroy" {}

variable "environment" {
  type = "list"
}

variable "type" {
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

variable "common_tags" {
  type = "map"
}

variable "package_name" {
  type = "string"
}

variable "source_buildspec" {
  type = "string"
}

variable "source_type" {
  type = "string"
}
