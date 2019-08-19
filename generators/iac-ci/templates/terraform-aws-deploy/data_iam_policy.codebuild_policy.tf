data "aws_iam_policy_document" "codebuild_policy" {
  statement {
    actions = [
      "apigateway:*",
    ]

    resources = ["arn:aws:apigateway:*::*"]
  }

  statement {
    actions = [
      "s3:*",
    ]

    resources = [
      "arn:aws:s3:::${local.bucketname}",
      "arn:aws:s3:::${local.bucketname}/*",
      "arn:aws:s3:::codepipeline-eu-west-1-*",
      "arn:aws:s3:::${var.package_name}-${data.aws_caller_identity.current.account_id}-artifacts/*",
      "arn:aws:s3:::${var.package_name}-${data.aws_caller_identity.current.account_id}-artifacts/",
    ]
  }

  statement {
    actions = [
      "iam:AttachRolePolicy",
      "iam:CreatePolicy",
      "iam:CreateRole",
      "iam:DeletePolicy",
      "iam:DeleteRole",
      "iam:DeleteRolePolicy",
      "iam:DetachRolePolicy",
      "iam:GetPolicy",
      "iam:GetRole",
      "iam:GetRolePolicy",
      "iam:GetPolicyVersion",
      "iam:ListAttachedRolePolicies",
      "iam:ListInstanceProfilesForRole",
      "iam:ListPolicies",
      "iam:ListRolePolicies",
      "iam:ListRoles",
      "iam:PassRole",
      "iam:PutRolePolicy",
      "iam:TagRole",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "lambda:AddLayerVersionPermission",
      "lambda:AddPermission",
      "lambda:CreateAlias",
      "lambda:CreateEventSourceMapping",
      "lambda:CreateFunction",
      "lambda:DeleteAlias",
      "lambda:DeleteEventSourceMapping",
      "lambda:DeleteFunction",
      "lambda:DeleteFunctionConcurrency",
      "lambda:DeleteLayerVersion",
      "lambda:EnableReplication",
      "lambda:GetAccountSettings",
      "lambda:GetAlias",
      "lambda:GetEventSourceMapping",
      "lambda:GetFunction",
      "lambda:GetFunctionConfiguration",
      "lambda:GetLayerVersion",
      "lambda:GetLayerVersionPolicy",
      "lambda:GetPolicy",
      "lambda:InvokeAsync",
      "lambda:InvokeFunction",
      "lambda:ListAliases",
      "lambda:ListEventSourceMappings",
      "lambda:ListFunctions",
      "lambda:ListLayers",
      "lambda:ListLayerVersions",
      "lambda:ListTags",
      "lambda:ListVersionsByFunction",
      "lambda:PublishLayerVersion",
      "lambda:PublishVersion",
      "lambda:PutFunctionConcurrency",
      "lambda:RemoveLayerVersionPermission",
      "lambda:RemovePermission",
      "lambda:TagResource",
      "lambda:UntagResource",
      "lambda:UpdateAlias",
      "lambda:UpdateEventSourceMapping",
      "lambda:UpdateFunctionCode",
      "lambda:UpdateFunctionConfiguration",
    ]

    resources = [
      "*",
    ]
  }

  statement {
    actions = [
      "ec2:CreateNetworkInterface",
      "ec2:DescribeVpcs",
      "ec2:DescribeSubnets",
      "ec2:DescribeSecurityGroups",
    ]

    resources = [
      "*",
    ]
  }

  statement {
    actions = [
      "kms:*",
    ]

    resources = [
      "*",
    ]
  }

  statement {
    actions = [
      "codebuild:*",
    ]

    resources = [
      "*",
    ]
  }

  statement {
    actions = [
      "ecr:*",
    ]

    resources = [
      "*",
    ]
  }

  statement {
    actions = [
      "s3:GetAccountPublicAccessBlock",
      "s3:HeadBucket",
      "s3:ListAllMyBuckets",
      "s3:PutAccountPublicAccessBlock",
    ]

    resources = ["*"]
  }

  statement {
    actions = [
      "ssm:DeleteParameter",
      "ssm:DeleteParameters",
      "ssm:DescribeParameters",
      "ssm:GetParameter",
      "ssm:GetParameterHistory",
      "ssm:GetParameters",
      "ssm:GetParametersByPath",
      "ssm:PutParameter",
      "ssm:ListTagsForResource",
    ]

    resources = [
      "*",
    ]
  }

  statement {
    actions = [
      "logs:*",
    ]

    resources = [
      "*",
    ]
  }
}
