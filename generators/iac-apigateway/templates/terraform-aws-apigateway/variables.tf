variable "region" {
  type = "string"
}

variable "lambda_arn" {
  type = "string"
}

variable "lambda_name" {
  type = "string"
}

variable "environment" {
  type = "string"
}

variable "name" {
  type = "string"
}

variable "path_part" {
  type    = "string"
  default = "api"
}
