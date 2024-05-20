import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { IsOptional } from 'class-validator';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @IsOptional()
  readonly name: string;

  @IsOptional()
  readonly type: string;

  @IsOptional()
  readonly location: string;

  @IsOptional()
  readonly owner: string;

  @IsOptional()
  readonly userId: string;
}
