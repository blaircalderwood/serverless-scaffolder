resource "aws_api_gateway_integration_response" "integration_response" {
  depends_on = [
    "aws_api_gateway_integration.request_method_integration",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.default.id}"
  http_method = "${aws_api_gateway_method.request_method.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }

  response_templates = {
    "application/json" = "Empty"
  }
}
