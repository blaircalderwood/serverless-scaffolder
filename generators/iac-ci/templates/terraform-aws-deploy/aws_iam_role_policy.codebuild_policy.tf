resource "aws_iam_role_policy" "codebuild_policy" {
  name   = "codebuildpolicy-${var.name}"
  role   = "${aws_iam_role.codebuild.id}"
  policy = "${data.aws_iam_policy_document.codebuild_policy.json}"
}
