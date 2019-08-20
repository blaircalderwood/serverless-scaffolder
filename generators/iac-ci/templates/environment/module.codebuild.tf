module "codebuild" {
  source                 = "../../modules/terraform-aws-deploy"
  artifacts_type         = "CODEPIPELINE"
  build_timeout          = "${var.build_timeout}"
  common_tags            = "${var.common_tags}"
  description            = "${var.description}"
  encryption_disabled    = true
  environment            = "${var.environment}"
  force_artifact_destroy = "${var.force_artifact_destroy}"
  name                   = "${var.name}"
  package_name           = "${var.package_name}"
  source_buildspec       = "${var.source_buildspec}"
  source_type            = "${var.source_type}"
  projectroot            = "${var.projectroot}"
  reponame               = "${var.reponame}"
  type                   = "${var.type}"
}
