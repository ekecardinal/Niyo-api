import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { MessagingGateway } from './socketio/messaging_service';

@Module({
  imports: [DatabaseModule, AuthModule, JobModule],
  controllers: [AppController],
  providers: [AppService, MessagingGateway],
})
export class AppModule {}
