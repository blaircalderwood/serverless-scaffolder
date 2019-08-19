resource "aws_cloudwatch_log_group" "lambda-log-group" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = 14
}
