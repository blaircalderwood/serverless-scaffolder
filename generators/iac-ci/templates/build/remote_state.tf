terraform {
  #add role_arn to use assumed roles to access the bucket
  backend "s3" {
    encrypt        = true
    bucket         = "<%= awsAccountNumber %>-terraform-state"
    key            = "<%= pipelineName %>/codebuild/terraform.tfstate"
    dynamodb_table = "dynamodb-state-lock"
    region         = "eu-west-1"
  }
}
