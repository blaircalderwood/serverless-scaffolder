module "apigateway" {
  source      = "../../modules/terraform-aws-apigateway/"
  name        = "${var.name}"
  region      = "${var.region}"
  lambda_arn  = "${var.lambda_arn}"
  lambda_name = "${var.lambda_name}"
  environment = "${var.environment}"
  path_part   = "${var.path_part}"
}
