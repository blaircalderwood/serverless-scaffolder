module "lambda" {
  source        = "../../modules/terraform-aws-lambda/"
  artifact_name = "${var.name}"
  common_tags   = "${var.common_tags}"
  environment   = "${var.environment}"
  name          = "${var.name}"
  vpc_config    = "${var.vpc_config}"
  s3_bucket     = "${var.artifact_bucket}"
  s3_key        = "${local.s3_key}"
}
