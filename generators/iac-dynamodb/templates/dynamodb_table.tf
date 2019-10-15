resource "aws_dynamodb_table" "bc-table-name-dev" {
  name           = "${var.table_name}"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "${var.hash_key}"
  range_key      = "${var.range_key}"

  attribute {
    name = "${var.hash_key}"
    type = "${var.hash_key_type}"
  }

  attribute {
    name = "${var.range_key}"
    type = "${var.range_key_type}"
  }
}
