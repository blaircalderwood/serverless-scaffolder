module "slacknotifier" {
  source        = "git::https://github.com/slalom-consulting-ltd/terraform-aws-codepipeline-slacknotifier.git?ref=v0.0.1"
  function_name = "${var.slacknotifier_function_name}"
  pipeline_name = "${var.name}"
}
