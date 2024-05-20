import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: Prisma.UserCreateInput) {
    const { email, password } = createAuthDto;

    const userExist = await this.databaseService.user.findUnique({
      where: {
        email: email!,
      },
    });
    if (userExist) {
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.databaseService.user.create({
      data: { ...createAuthDto, password: hashedPassword },
    });

    const token = this.jwtService.sign({ id: user.id });
    // let token = 'ghajkwiueygtdfbnxjsak';
    return {
      token,
      user: {
        email: user.email,
        fullname: user.fullName,
        id: user.id,
      },
      message: 'Registered Successfully',
    };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ token: string; user: object; message: string }> {
    const { email, password } = loginDto;

    const user = await this.databaseService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = this.jwtService.sign({ id: user.id });

    return {
      token,
      user: {
        email: user.email,
        fullname: user.fullName,
        id: user.id,
      },
      message: 'Login Successfully',
    };
  }

  async findAll(query: Query): Promise<User[]> {
    const search = (query.search as string) ? (query.search as string) : '';
    const limit = query.limit ? Number(query.limit) : undefined;
    const offset = query.offset ? Number(query.offset) : undefined;
    const allUsers = await this.databaseService.user.findMany({
      take: limit,
      skip: offset,
      where: {
        OR: [
          {
            fullName: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
    return allUsers;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<User> {
    const user = await this.databaseService.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    return await this.databaseService.user.update({
      where: {
        id: id,
      },
      data: updateAuthDto,
    });
  }
}
