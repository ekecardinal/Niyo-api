import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Put,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { Job, Prisma } from '@prisma/client';

@UseGuards(AuthenticationGuard)
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async create(
    @Req() { id },
    @Body() createJobDto: CreateJobDto,
  ): Promise<{ job: Job; message: string }> {
    return this.jobService.create(createJobDto);
  }

  @Get()
  findAll(@Query() query: ExpressQuery): Promise<Job[]> {
    return this.jobService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Job> {
    return this.jobService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
  ): Promise<{ job: Job; message: string }> {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.jobService.remove(id);
  }
}
