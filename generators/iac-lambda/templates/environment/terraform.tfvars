common_tags = {
  name = "<%= projectNameKebabCase %>"
}

name = "<%= projectNameKebabCase %>"

environment = "<%= environment %>"

vpc_config = [
  <%if (awsLambdaSg) { %>
  {
  security_group_ids = ["<%= awsLambdaSg %>"]
  subnet_ids         = ["<%= awsLambdaSubnets %>"]
}
<% } %>
]

artifact_bucket = "<%= projectNameKebabCase %>-<%= awsAccountNumber %>-artifacts"

versionpath = "/core/codebuild/<%= projectNameKebabCase %>/latest"
