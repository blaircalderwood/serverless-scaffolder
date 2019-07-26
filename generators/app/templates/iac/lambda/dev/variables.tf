variable "common_tags" {
  type = "map"
}

variable "vpc_config" {
  type = "list"
}

variable "name" {
  type = "string"
}

variable "environment" {
  type = "string"
}

variable "version" {
  type    = "string"
  default = ""
}

variable "artifact_bucket" {
  type = "string"
}

variable "versionpath" {
  type = "string"
}
