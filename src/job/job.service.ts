import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Job } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createJobDto: Prisma.JobCreateInput,
  ): Promise<{ job: Job; message: string }> {
    const res = await this.databaseService.job.create({
      data: { ...createJobDto },
    });

    return {
      job: res,
      message: 'Staff created successfully',
    };
  }

  async findAll(query) {
    const search = (query.search as string) ? (query.search as string) : '';
    const limit = query.limit ? Number(query.limit) : undefined;
    const offset = query.offset ? Number(query.offset) : undefined;
    const allJobs = await this.databaseService.job.findMany({
      take: limit,
      skip: offset,
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: { user: true },
    });
    return allJobs;
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.databaseService.job.findUnique({
      where: { id: id },
    });
    return job;
  }

  async update(
    id: string,
    updateJobDto: Prisma.JobUpdateInput,
  ): Promise<{ job: Job; message: string }> {
    const job = await this.databaseService.job.findUnique({
      where: { id: id },
    });

    if (!job) {
      throw new NotFoundException('Job does not exist');
    }

    const updated = await this.databaseService.job.update({
      where: {
        id: id,
      },
      data: updateJobDto,
    });
    return { job: updated, message: 'Updated successfully' };
  }

  async remove(id: string): Promise<{ message: string }> {
    const job = await this.databaseService.job.findUnique({
      where: { id: id },
    });

    if (!job) {
      throw new NotFoundException('Job does not exist');
    }
    await this.databaseService.job.delete({
      where: {
        id: id,
      },
    });
    return { message: 'Job Deleted Successfully' };
  }
}
