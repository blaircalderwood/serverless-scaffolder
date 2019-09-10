resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowLambdaExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${var.lambda_name}"
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_deployment.deployment.execution_arn}*/*/*"
}
