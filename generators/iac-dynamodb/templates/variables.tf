variable "table_name" {
  type = "string"
}

variable "hash_key" {
  type = "string"
}

variable "hash_key_type" {
  type = "string"
}

variable "range_key" {
  type    = "string"
  default = ""
}

variable "range_key_type" {
  type = "string"
}
