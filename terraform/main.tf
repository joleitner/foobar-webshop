terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_sqs_queue" "warehouse_queue" {
  name = "joleitner-warehouse-queue"
}

resource "aws_sns_topic_subscription" "warehouse_subscription" {
  topic_arn = "arn:aws:sns:eu-central-1:692063941275:foobar-gmbh-lagerhaltung-antworten"
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.warehouse_queue.arn
}

# policy for queue to allow sns to send messages
data "aws_iam_policy_document" "warehouse_queue_policy" {
  statement {
    sid       = "AllowSQSQueue"
    effect    = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = ["sqs:SendMessage"]
    resources = [aws_sqs_queue.warehouse_queue.arn]
    
    condition {
      test     = "ArnEquals"
      variable = "aws:SourceArn"
      values   = [aws_sns_topic_subscription.warehouse_subscription.topic_arn]
    }
  }
}

resource "aws_sqs_queue_policy" "warehouse_queue_policy" {
  queue_url = aws_sqs_queue.warehouse_queue.id
  policy    = data.aws_iam_policy_document.warehouse_queue_policy.json
}
