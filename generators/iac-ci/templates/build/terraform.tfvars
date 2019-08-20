name = "<%= pipelineName %>"

description = "The CodeBuild project for code in <%= pipelineName %>"

projectroot = "core"

repo_default_branch = "master"

force_artifact_destroy = "true"

build_timeout = "60"

env = "dev"

type = "S3"

environment = [{
  compute_type    = "BUILD_GENERAL1_SMALL"
  image           = "553700203877.dkr.ecr.eu-west-1.amazonaws.com/aws-codebuild-container:10" # This is hardcoded for our current project
  type            = "LINUX_CONTAINER"
  privileged_mode = "false"
}]

sourcecode = [{
  type      = "CODECOMMIT"
  buildspec = "iac/codebuild/build/buildspec.yml"
  location  = "<%= gitRepo %>"
}]

common_tags = {
  name = "<%= pipelineName %>"
}
