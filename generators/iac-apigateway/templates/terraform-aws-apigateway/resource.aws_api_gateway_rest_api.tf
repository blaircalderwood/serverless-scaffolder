resource "aws_api_gateway_rest_api" "api" {
  name = "${var.name}-${var.environment}"
}
