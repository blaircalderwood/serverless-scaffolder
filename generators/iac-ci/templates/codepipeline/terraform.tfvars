artifact_store = [{
  location = "codepipeline-eu-west-1-163714928765"
  type     = "S3"
}]

name = "<%= pipelineName %>"

stage = [{
  name = "Source"

  action = [{
    name     = "Source"
    category = "Source"
    owner    = "AWS"
    provider = "CodeCommit"
    version  = "1"

    configuration = {
      BranchName           = "master"
      PollForSourceChanges = "false"
      RepositoryName       = "<%= pipelineName %>"
    }

    output_artifacts = ["SourceArtifact"]
  }]
},
  {
    name = "Build"

    action = [{
      name             = "build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["SourceArtifact"]
      output_artifacts = ["BuildArtifact"]
      version          = "1"

      configuration = {
        ProjectName = "<%= pipelineName %>"
      }
    }]
  },
  {
    name = "deploy-dev"

    action = [{
      name            = "deploy-dev"
      category        = "Build"
      owner           = "AWS"
      provider        = "CodeBuild"
      version         = "1"
      input_artifacts = ["SourceArtifact"]

      configuration = {
        ProjectName = "<%= pipelineName %>-deploy-dev"
      }
    }]
  },
  {
    name = "deploy-test"

    action = [{
      name     = "AcceptToTest"
      category = "Approval"
      owner    = "AWS"
      provider = "Manual"
      version  = "1"
    },
      {
        name            = "deploy-test"
        category        = "Build"
        owner           = "AWS"
        provider        = "CodeBuild"
        version         = "1"
        input_artifacts = ["SourceArtifact"]

        configuration = {
          ProjectName = "<%= pipelineName %>-deploy-test"
        }
      },
    ]
  },
]

environment = [{
  compute_type                = "BUILD_GENERAL1_SMALL"
  image                       = "553700203877.dkr.ecr.eu-west-1.amazonaws.com/aws-codebuild-container:5"
  type                        = "LINUX_CONTAINER"
  privileged_mode             = "false"
  image_pull_credentials_type = "CODEBUILD"
}]

common_tags = {
  name = "<%= pipelineName %>"
}

sourcecode = [{
  type            = "CODECOMMIT"
  git_clone_depth = "1"
  buildspec       = ""
  location        = "<%= gitRepo %>"
}]

build_timeout = 60

description = "Policy used in trust relationship with CodePipeline"

env = "dev"

force_artifact_destroy = true

projectroot = "core"

slacknotifier_function_name = "wilburSlackWebhook"

type = "CODEPIPELINE"
