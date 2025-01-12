import { Module, Global } from '@nestjs/common';

import { FirebaseService } from './firebase.service';

@Global()
@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {
  constructor(private readonly service: FirebaseService) {}
}
