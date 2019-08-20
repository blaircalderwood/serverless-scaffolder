resource "aws_s3_bucket_policy" "access-artifact" {
  bucket = "${module.codebuild.artifact_bucket}"

  depends_on = ["module.codebuild"]

  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:s3:::${var.name}-${data.aws_caller_identity.current.account_id}-artifacts",   
                "arn:aws:s3:::${var.name}-${data.aws_caller_identity.current.account_id}-artifacts/*"
            ],
            "Principal": {
                "AWS": [
                    "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
                ]
            }
        }
    ]
}
POLICY
}
