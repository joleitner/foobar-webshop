output "sqs_queue_url" {
    value = aws_sqs_queue.warehouse_queue.url
}