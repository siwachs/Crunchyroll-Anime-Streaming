import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';

import { Kafka, Producer, Consumer, EachMessagePayload } from 'kafkajs';

type Chunk = {
  messageId: string;
  chunkIndex: number;
  totalChunks: number;
  data: string;
};

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly producer: Producer;
  private readonly consumers: Map<string, Consumer> = new Map();
  private readonly chunkSize: number = 60 * 1024;

  constructor(@Inject('KAFKA_CLIENT') private readonly kafka: Kafka) {
    this.producer = kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    for (const consumer of this.consumers.values()) await consumer.disconnect();

    await this.producer.disconnect();
  }

  private genereateUniqueId() {
    const timestamp = Date.now().toString(36);
    const randomNumber = Math.random().toString(36).substring(2, 5);
    return `${timestamp}-${randomNumber}`;
  }

  private getMessageChunks(message: Buffer): Chunk[] {
    const chunks: Chunk[] = [];
    const totalChunks = Math.ceil(message.length / this.chunkSize);
    const messageId = this.genereateUniqueId();

    for (let i = 0; i < totalChunks; i++) {
      const start = i * this.chunkSize;
      const end = Math.min(start + this.chunkSize, message.length);

      const chunkData = message.subarray(start, end);
      const chunk = {
        messageId,
        chunkIndex: i,
        totalChunks,
        data: chunkData.toString('base64'),
      };

      chunks.push(chunk);
    }

    return chunks;
  }

  async sendMessage(topic: string, key: string, message: object) {
    const messageBuffer = Buffer.from(JSON.stringify(message));
    const chunks = this.getMessageChunks(messageBuffer);

    for (const chunk of chunks) {
      await this.producer.send({
        topic,
        messages: [{ key, value: JSON.stringify(chunk) }],
      });
    }
  }

  async addConsumer(
    topic: string,
    groupId: string,
    messageHandler: (message: EachMessagePayload) => Promise<void>,
  ) {
    if (this.consumers.has(topic))
      return console.warn(
        `Consumer for topic: ${topic} is already registered.`,
      );

    const consumer = this.kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe({ topic });

    const messagesBufferMap: Map<string, Buffer[]> = new Map();

    consumer.run({
      eachMessage: async ({ message, topic }) => {
        const chunk: Chunk = JSON.parse(message.value.toString());
        const chunkData = Buffer.from(chunk.data, 'base64');

        if (!messagesBufferMap.has(chunk.messageId))
          messagesBufferMap.set(
            chunk.messageId,
            new Array(chunk.totalChunks).fill(undefined),
          );

        const buffers = messagesBufferMap.get(chunk.messageId);
        buffers[chunk.chunkIndex] = chunkData;

        if (buffers.length === chunk.totalChunks && buffers.every(Boolean)) {
          const fullMessageBuffer = Buffer.concat(buffers);
          const fullMessage = JSON.parse(fullMessageBuffer.toString());

          try {
            await messageHandler(fullMessage);
          } catch (error) {
            console.error(
              `Error in message handler for topic: ${topic}`,
              error,
            );
          }
          messagesBufferMap.delete(chunk.messageId);
        }
      },
    });

    this.consumers.set(topic, consumer);
  }
}
