data "aws_ssm_parameter" "version" {
  name = "${var.versionpath}"
}
