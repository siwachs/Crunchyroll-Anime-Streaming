import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import {
  Kafka,
  Producer,
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
} from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly consumers: Consumer[];

  constructor() {
    const clientId = process.env.KAFKA_CLIENT_ID;
    const brokers = process.env.KAFKA_BROKERS;

    if (!clientId || !brokers)
      throw new Error('KAFKA_CLIENT_ID and KAFKA_BROKERS is required!');

    this.kafka = new Kafka({
      clientId,
      brokers: JSON.parse(brokers),
    });

    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.connectProducer();
  }

  async onModuleDestroy() {
    await this.disconnectProducer();
    await Promise.all(this.consumers.map((consumer) => consumer.disconnect()));
  }

  private async connectProducer() {
    await this.producer.connect();
  }

  private async disconnectProducer() {
    await this.producer.disconnect();
  }

  async sendMessage(topic: string, messages: { key: string; value: string }[]) {
    await this.producer.send({ topic, messages });
  }

  async createConsumer(
    groupId: string,
    topic: ConsumerSubscribeTopics,
    config: ConsumerRunConfig,
  ) {
    const consumer = this.kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);

    this.consumers.push(consumer);
  }
}
