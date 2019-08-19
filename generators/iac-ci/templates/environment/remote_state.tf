terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "553700203877-terraform-state"
    key            = "wilbur-hr/<%= pipelineName %>/<%= environment %>/codebuild/terraform.tfstate"
    dynamodb_table = "dynamodb-state-lock"
    region         = "eu-west-1"
  }
}
