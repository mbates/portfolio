# infra

Terraform for the portfolio's hosting: the S3 bucket, its CloudFront distribution, the DNS records
and the role GitHub Actions deploys with. Profile `mike`; state in `bates-solutions-terraform-state`
(made by the bates-solutions monorepo's `infra/bootstrap`) under `portfolio/terraform.tfstate`.

```sh
npm run infra:init
npm run infra:plan
npm run infra:apply
```

The bucket, its policy, the origin access control, the distribution and the apex record were
created by hand and are imported (`imports.tf`), not recreated. Not managed here yet: the bucket's
public access block, website configuration, versioning and encryption, and the contact Lambda and
API, which Serverless Framework deploys (`serverless/`).

The site answers on `bates-solutions.com` and `mike.bates-solutions.com` until the company site
launches and takes the apex (plan 12, Part 1, step 6).

## First apply, then the deploy role

1. `npm run infra:apply`: imports the five resources, adds the `mike.` alias and its A and AAAA
   records, and creates `portfolio-github-deploy`.
2. Set the repository variable the deploy workflow reads:
   `gh variable set AWS_DEPLOY_ROLE_ARN -R mbates/portfolio --body "$(terraform -chdir=infra output -raw deploy_role_arn)"`
3. Merge. The next deploy uses the role; then delete the old `AWS_ACCESS_KEY` variable and
   `AWS_SECRET_ACCESS_KEY` secret, and the IAM user's access key behind them.
