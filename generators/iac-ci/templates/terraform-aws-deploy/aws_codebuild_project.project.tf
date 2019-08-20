resource "aws_codebuild_project" "project" {
  name          = "${replace(var.name,".","-")}"
  description   = "${var.description}"
  service_role  = "${aws_iam_role.codebuild.arn}"
  build_timeout = "${var.build_timeout}"

  artifacts {
    type                = "${var.artifacts_type}"
    encryption_disabled = "${var.encryption_disabled}"
  }

  environment = "${var.environment}"

  source = [{
    type      = "${var.source_type}"
    buildspec = "${var.source_buildspec}"
  }]

  tags = "${var.common_tags}"
}
