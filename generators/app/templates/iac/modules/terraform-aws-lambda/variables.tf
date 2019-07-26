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

variable "artifact_name" {
  type = "string"
}

variable "s3_bucket" {
  type = "string"
}

variable "s3_key" {
  type = "string"
}
