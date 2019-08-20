resource "aws_ssm_parameter" "deployed" {
  name  = "/${var.projectroot}/codebuild/${var.name}/deployed"
  type  = "String"
  value = "0"

  # i don't care what it's current value is
  lifecycle {
    ignore_changes = ["value"]
  }
}
