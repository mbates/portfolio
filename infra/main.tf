# The portfolio's hosting, created by hand before this file existed and imported as it was
# (imports.tf), plus mike.bates-solutions.com: the site answers on the apex and on mike. until
# the company site launches and takes the apex (plan 12, Part 1, step 6).
#
# Not managed here yet: the bucket's public access block, website configuration, versioning and
# encryption (imported as-is would be a no-op; tightening them is a follow-up), and the contact
# Lambda and API, which Serverless Framework owns through CloudFormation (serverless/).

locals {
  bucket = "bates-portfolio-s3"
  apex   = "bates-solutions.com"
  mike   = "mike.bates-solutions.com"
  # The account's existing certificate covers bates-solutions.com and *.bates-solutions.com.
  certificate_arn = "arn:aws:acm:us-east-1:697387133954:certificate/cbb793ed-445b-427a-95c0-436ec1c31434"
}

data "aws_route53_zone" "main" {
  name = local.apex
}

data "aws_cloudfront_cache_policy" "optimized" {
  name = "Managed-CachingOptimized"
}

resource "aws_s3_bucket" "site" {
  bucket = local.bucket
}

# Only CloudFront, and only this distribution, can read the bucket.
resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = jsonencode({
    Version = "2008-10-17"
    Id      = "PolicyForCloudFrontPrivateContent"
    Statement = [{
      Sid       = "AllowCloudFrontServicePrincipal"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.site.arn}/*"
      Condition = { StringEquals = { "AWS:SourceArn" = aws_cloudfront_distribution.site.arn } }
    }]
  })
}

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${local.bucket}.s3.us-east-1.amazonaws.com"
  description                       = "" # as created; the provider's default would be a change
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  http_version        = "http2"
  price_class         = "PriceClass_100"
  default_root_object = "index.html"
  aliases             = [local.apex, local.mike]
  tags                = { Project = "bates-solutions" } # as created

  origin {
    origin_id                = aws_s3_bucket.site.bucket_regional_domain_name
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id       = aws_s3_bucket.site.bucket_regional_domain_name
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    cache_policy_id        = data.aws_cloudfront_cache_policy.optimized.id
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = local.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

# The apex, as it was: an A record only. At launch it moves to the company site's distribution.
resource "aws_route53_record" "apex" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = local.apex
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "mike" {
  for_each = toset(["A", "AAAA"])

  zone_id = data.aws_route53_zone.main.zone_id
  name    = local.mike
  type    = each.key
  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
