resource "aws_lambda_function" "lambda" {
  function_name = "${var.name}-${var.environment}"
  s3_bucket     = "${var.s3_bucket}"
  s3_key        = "${var.s3_key}"
  handler       = "src/index.handler"
  role          = "${aws_iam_role.lambda_role.arn}"
  runtime       = "nodejs10.x"
  tags          = "${var.common_tags}"
  timeout       = "30"
  vpc_config    = "${var.vpc_config}"

  # environment {
  #   variables = {
  #     "A" = "${data.aws_ssm_parameter.example.value}"
  #     "B" = "${data.aws_ssm_parameter.example.value}"
  #   }
  # }
}
