data "aws_iam_policy_document" "terraform_policy" {
  statement {
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:GetBucketAcl",
      "s3:GetBucketLocation",
      "s3:ListBucket",
    ]

    resources = [
      "arn:aws:s3:::${data.aws_caller_identity.current.account_id}-terraform-state",
      "arn:aws:s3:::${data.aws_caller_identity.current.account_id}-terraform-state/*",
    ]
  }

  statement {
    actions = [
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
      "dynamodb:GetItem",
    ]

    resources = [
      "arn:aws:dynamodb:eu-west-1:${data.aws_caller_identity.current.account_id}:table/dynamodb-state-lock",
    ]
  }
}
