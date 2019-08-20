resource "aws_iam_role_policy" "additionalneeds" {
  name = "additionalneeds-${var.env}-${var.name}"
  role = "${module.codebuild.codebuild_role_name}"

  policy = <<HERE
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "lex:*",
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
              "ecr:GetLifecyclePolicyPreview",
              "ecr:GetDownloadUrlForLayer",
              "ecr:BatchGetImage",
              "ecr:DescribeImages",
              "ecr:GetAuthorizationToken",
              "ecr:DescribeRepositories",
              "ecr:ListTagsForResource",
              "ecr:ListImages",
              "ecr:BatchCheckLayerAvailability",
              "ecr:GetRepositoryPolicy",
              "ecr:GetLifecyclePolicy",
              "lambda:UpdateFunctionCode"
              ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor2",
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::${var.name}-${data.aws_caller_identity.current.account_id}-artifacts/*",
                "arn:aws:s3:::${var.name}-${data.aws_caller_identity.current.account_id}-artifacts",
                "arn:aws:s3:::codepipeline-eu-west-1-163714928765/*",
                "arn:aws:s3:::codepipeline-eu-west-1-163714928765/" 
            ]
        }
        ]
}
HERE
}
