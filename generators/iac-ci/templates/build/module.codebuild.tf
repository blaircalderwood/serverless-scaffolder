module "codebuild" {
  source                 = "jameswoolfenden/codebuild/aws"
  version                = "0.1.41"
  projectroot            = "${var.projectroot}"
  description            = "${var.description}"
  build_timeout          = "${var.build_timeout}"
  name                   = "${var.name}"
  sourcecode             = "${var.sourcecode}"
  common_tags            = "${var.common_tags}"
  environment            = "${var.environment}"
  force_artifact_destroy = "${var.force_artifact_destroy}"
  type                   = "${var.type}"
  reponame               = "${var.name}"
}
