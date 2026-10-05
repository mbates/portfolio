output "deploy_role_arn" {
  description = "Set as the AWS_DEPLOY_ROLE_ARN repository variable for the deploy workflow."
  value       = aws_iam_role.deploy.arn
}

output "distribution_id" {
  value = aws_cloudfront_distribution.site.id
}
