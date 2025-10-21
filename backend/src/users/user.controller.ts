import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Roles(UserRole.ADMIN)
  @Get('all')
  @ApiOperation({ summary: 'Récupérer la liste de tous les utilisateurs (ADMIN uniquement)' })
  async getAllUsers() {
    return await this.userRepository.find({
      select: ['id', 'email', 'role', 'createdAt', 'updatedAt'], 
    });
  }

  @Get('profile')
  @ApiOperation({ summary: 'Récupérer le profil de l’utilisateur connecté' })
  async getProfile(@Req() req) {
    return req.user; 
  }
}
