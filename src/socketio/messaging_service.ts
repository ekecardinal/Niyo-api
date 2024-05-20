import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

import { Socket, Server } from 'socket.io';
import { CreateJobDto } from 'src/job/dto/create-job.dto';
import { JobService } from 'src/job/job.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  constructor(private readonly patientService: JobService) {}

  @SubscribeMessage('create-job')
  async createPatient(client: Socket, createPatientDto: CreateJobDto) {
    const response = await this.patientService.create(createPatientDto);
    this.server.emit('create-job', response);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('connected', client.id);
  }
}
