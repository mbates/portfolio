# The hand-built resources, adopted into state on the first apply rather than recreated. Once
# applied these blocks are inert and can stay as a record of where each came from.

import {
  to = aws_s3_bucket.site
  id = "bates-portfolio-s3"
}

import {
  to = aws_s3_bucket_policy.site
  id = "bates-portfolio-s3"
}

import {
  to = aws_cloudfront_origin_access_control.site
  id = "E1KS5GRRBKXRCB"
}

import {
  to = aws_cloudfront_distribution.site
  id = "E229ACJX46CML2"
}

import {
  to = aws_route53_record.apex
  id = "Z0716170EC3OMWSPGQLD_bates-solutions.com_A"
}
