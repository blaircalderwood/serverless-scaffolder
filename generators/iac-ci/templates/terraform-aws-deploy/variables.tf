variable "name" {
  description = "The name of the Build"
}

variable "reponame" {
  type        = "string"
  description = "The name of the repository"
  default     = ""
}

variable "force_artifact_destroy" {
  type        = "string"
  description = "Force the removal of the artifact S3 bucket on destroy (default: false)."
}

variable "environment" {
  type        = "list"
  description = "The environment being deployed"
}

variable "build_timeout" {
  description = "The time to wait for a CodeBuild to complete before timing out in minutes (default: 5)"
}

variable "type" {
  type = "string"
}

variable "bucketname" {
  type    = "string"
  default = ""
}

variable "region" {
  default     = "eu-west-1"
  description = "Which aws region this is in."
}

variable "source_buildspec" {
  type        = "string"
  description = "The Spec"
}

variable "role" {
  description = "Override for providing a role"
  default     = ""
  type        = "string"
}

variable "common_tags" {
  type        = "map"
  description = "An AWS tagging scheme"
}

variable "projectroot" {
  description = "The name of the parent project for SSM"
}

variable "source_type" {
  type = "string"

  default = ""
}

variable "description" {}

variable "encryption_disabled" {
  type        = "string"
  description = "Codebuild will autoencrypt your files"
  default     = false
}

variable "package_name" {
  type = "string"
}

variable "artifacts_type" {
  default = "NONE"
}
