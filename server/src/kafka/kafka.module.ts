import { Module, DynamicModule } from '@nestjs/common';

import { KafkaService } from './kafka.service';

@Module({})
export class KafkaModule {
  static register(options: {
    clientId: string;
    brokers: string[];
  }): DynamicModule {
    return {
      module: KafkaModule,
      providers: [
        { provide: 'KAFKA_OPTIONS', useValue: options },
        KafkaService,
      ],
      exports: [KafkaService],
    };
  }
}
