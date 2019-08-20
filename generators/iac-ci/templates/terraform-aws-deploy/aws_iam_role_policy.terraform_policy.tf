resource "aws_iam_role_policy" "terraform_policy" {
  name   = "terraformpolicy-${var.name}"
  role   = "${aws_iam_role.codebuild.id}"
  policy = "${data.aws_iam_policy_document.terraform_policy.json}"
}
