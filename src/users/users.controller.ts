import { Controller, Get, UseGuards, Req, Body, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async getUsers() {
    return this.usersService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @Patch('update-info')
  updateUserInfo(@Req() req, @Body() body: { email?: string; password?: string }) {
    return this.usersService.updateUserInfo(req.user.sub, body);
  }
}
