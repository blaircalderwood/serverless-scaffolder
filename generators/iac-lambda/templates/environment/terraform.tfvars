common_tags = {
  name = "<%= projectNameKebabCase %>"
}

name = "<%= projectNameKebabCase %>"

environment = "<%= environment %>"

vpc_config = [{
  security_group_ids = ["<%= awsLambdaSg %>"]
  subnet_ids         = ["<%= awsLambdaSubnet1 %>", "<%= awsLambdaSubnet2 %>"]
}]

artifact_bucket = "<%= projectNameKebabCase %>-<%= awsAccountNumber %>-artifacts"

versionpath = "/core/codebuild/<%= projectNameKebabCase %>/latest"
