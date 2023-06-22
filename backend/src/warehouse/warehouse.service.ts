import { Injectable } from '@nestjs/common';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';
import { env } from 'process';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WarehouseService {
  private readonly snsClient: SNSClient;
  private readonly sqsClient: SQSClient;

  constructor(private prisma: PrismaService) {
    const clientConfig = {
      region: `${env.AWS_REGION}`,
      credentials: {
        accessKeyId: `${env.AWS_ACCESS_KEY}`,
        secretAccessKey: `${env.AWS_SECRET_ACCESS_KEY}`,
      },
    };

    this.snsClient = new SNSClient(clientConfig);
    this.sqsClient = new SQSClient(clientConfig);
  }

  async sendDeliveryRequest(order: any) {
    const message = {
      id: order.id,
      items: Object.entries(order.articles).map(
        ([key, value]: [string, any]) => ({
          name: value.article.name,
          quantity: value.quantity,
        }),
      ),
      address: {
        country: 'GERMANY',
        state: '',
        city: order.city,
        zip: order.zip,
        address1: order.name,
        address2: order.address,
        address3: '',
      },
    };

    const command = new PublishCommand({
      TopicArn: `${env.SNS_TOPIC_ARN_REQUEST}`,
      Message: JSON.stringify(message),
    });

    try {
      const response = await this.snsClient.send(command);
      console.log('Delivery request sent for:', order.id);
      return response;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  // for getting the delivery messages from the sns topic a amazon SQS queue is used
  // it can be created with terrafrom from the terraform folder
  // the output queueurl has to be added to the .env file which then is used here
  async updateDeliveryStatus() {
    const command = new ReceiveMessageCommand({
      QueueUrl: env.SQS_QUEUE_URL,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 10,
    });
    const pendingOrders = await this.getOrdersPendingDeliveryStatus();
    let messagesAvailable = true;

    while (messagesAvailable) {
      const response = await this.sqsClient.send(command);

      if (response.Messages && response.Messages.length > 0) {
        for (const message of response.Messages) {
          const deliveryStatus = await JSON.parse(message.Body);
          const deliveryMessage = JSON.parse(deliveryStatus.Message);

          if (pendingOrders.includes(deliveryMessage.id)) {
            try {
              const updatedOrder = await this.prisma.order.update({
                where: {
                  id: deliveryMessage.id,
                },
                data: {
                  status:
                    deliveryMessage.status == 'sent' ? 'SHIPPED' : 'ACCEPTED',
                  deliveryStatus: deliveryMessage.status,
                  deliveryMessage: deliveryMessage.comment,
                },
              });

              if (updatedOrder) {
                console.log('Delivery status updated successfully');
                await this.deleteMessageFromQueue(message.ReceiptHandle);
              }
            } catch (error) {
              console.error('Failed to update delivery status:', error);
            }
          } else {
            await this.deleteMessageFromQueue(message.ReceiptHandle);
          }
        }
      } else {
        messagesAvailable = false;
      }
    }
  }

  private async deleteMessageFromQueue(receiptHandle: string) {
    // Delete the received message from the queue
    // This ensures that the message is not processed multiple times
    const command = new DeleteMessageCommand({
      QueueUrl: env.SQS_QUEUE_URL,
      ReceiptHandle: receiptHandle,
    });

    await this.sqsClient.send(command);
  }

  private async getOrdersPendingDeliveryStatus(): Promise<string[]> {
    const order = await this.prisma.order.findMany({
      select: {
        id: true,
      },
      where: {
        deliveryStatus: null,
      },
    });

    return order.map((o) => o.id);
  }
}
