locals {
  s3_key = "${var.name}-${var.version == "" ? data.aws_ssm_parameter.version.value : var.version }.zip"
}
