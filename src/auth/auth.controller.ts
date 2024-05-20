import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('auth/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createAuthDto: CreateAuthDto): Promise<{
    token: string;
    user: object;
    message: string;
  }> {
    return await this.authService.create(createAuthDto);
  }

  @Post('login')
  async loing(
    @Body() loginDto: LoginDto,
  ): Promise<{ token: string; user: object; message: string }> {
    return await this.authService.login(loginDto);
  }

  @UseGuards(AuthenticationGuard)
  @Get('')
  async findAll(@Query() query: ExpressQuery) {
    return await this.authService.findAll(query);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return await this.authService.update(id, updateAuthDto);
  }
}
