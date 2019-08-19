name = "<%= pipelineName %>-deploy-<%= environment %>"

description = ""

projectroot = "core"

repo_default_branch = "master"

force_artifact_destroy = "false"

build_timeout = "60"

env = "<%= environment %>"

reponame = "<%= pipelineName %>"

type = "S3"

environment = [{
  compute_type    = "BUILD_GENERAL1_SMALL"
  image           = "553700203877.dkr.ecr.eu-west-1.amazonaws.com/aws-codebuild-container:5"
  type            = "LINUX_CONTAINER"
  privileged_mode = "false"
}]

sourcecode = [{
  type      = "CODEPIPELINE"
  buildspec = "iac/codebuild/deploy-<%= environment %>/buildspec.yml"
  location  = ""
}]

common_tags = {
  name = "<%= pipelineName %>"
}

source_type = "CODEPIPELINE"

source_buildspec = "iac/codebuild/deploy-<%= environment %>/buildspec.yml"

package_name = "<%= pipelineName %>"
