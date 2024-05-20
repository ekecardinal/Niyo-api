import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  readonly location: string;

  @IsNotEmpty()
  readonly owner: string;

  @IsOptional()
  readonly userId: string;
}
