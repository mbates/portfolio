terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.65"
    }
  }

  # The same state bucket as the bates-solutions monorepo's infra (its infra/bootstrap made it),
  # under this repo's own key. use_lockfile gives S3-native state locking.
  backend "s3" {
    bucket       = "bates-solutions-terraform-state"
    key          = "portfolio/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  # CloudFront certificates live in us-east-1; everything here is there too. No default_tags:
  # on the imported resources they'd be a change, and the import should change nothing.
  region = "us-east-1"
}
