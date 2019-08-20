terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "<%= awsAccountNumber %>-terraform-state"
    key            = "<%= projectName %>/<%= environment %>/terraform.tfstate"
    dynamodb_table = "dynamodb-state-lock"
    region         = "<%= awsRegion %>"
  }
}
