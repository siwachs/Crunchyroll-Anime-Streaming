import { Global, Module, DynamicModule, Provider } from '@nestjs/common';

import { Kafka } from 'kafkajs';
import { KafkaService } from './kafka.service';

@Global()
@Module({})
export class KafkaModule {
  static register(options: {
    clientId: string;
    brokers: string[];
  }): DynamicModule {
    const kafkaProvider: Provider = {
      provide: 'KAFKA_CLIENT',
      useFactory: () => new Kafka(options),
    };

    return {
      global: true,
      module: KafkaModule,
      providers: [kafkaProvider, KafkaService],
      exports: [KafkaService],
    };
  }
}
