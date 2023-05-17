import { Injectable } from '@nestjs/common';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { env } from 'process';

@Injectable()
export class WarehouseService {
  private readonly snsClient: SNSClient;

  constructor() {
    this.snsClient = new SNSClient({
      region: `${env.AWS_REGION}`,
      credentials: {
        accessKeyId: `${env.AWS_ACCESS_KEY}`,
        secretAccessKey: `${env.AWS_SECRET_ACCESS_KEY}`,
      },
    });
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
      return response;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }
}
