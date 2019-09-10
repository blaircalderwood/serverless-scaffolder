resource "aws_api_gateway_deployment" "deployment" {
  depends_on = [
    "aws_api_gateway_method.request_method",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "${var.environment}"
}
