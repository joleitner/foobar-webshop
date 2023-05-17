# provider "aws" {
#   region = "eu-central-1"
# }

# resource "aws_sqs_queue" "warehouse_queue" {
#   name = "warehouse-queue"
# }

# resource "aws_sns_topic_subscription" "my_subscription" {
#   topic_arn = "arn:aws:sns:eu-central-1:692063941275:foobar-gmbh-lagerhaltung-antworten"
#   protocol  = "sqs"
#   endpoint  = aws_sqs_queue.warehouse_queue.arn
# }