import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { User } from '../entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //  REGISTER
  @Post('register')
  @ApiOperation({ summary: "Inscription d’un nouvel utilisateur" })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.', type: User })
  @ApiResponse({ status: 400, description: 'Email déjà utilisé ou données invalides.' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto.email, createUserDto.password);
  }

  //  LOGIN
  @Post('login')
  @ApiOperation({ summary: "Connexion utilisateur (retourne access et refresh tokens)" })
  @ApiResponse({
    status: 200,
    description: 'Connexion réussie, tokens renvoyés.',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Identifiants invalides.' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto.email, loginUserDto.password);
  }

  // REFRESH TOKEN
  @Post('refresh')
  @ApiOperation({ summary: "Rafraîchir le token JWT (nécessite un refresh token valide)" })
  @ApiResponse({
    status: 200,
    description: 'Nouveau token JWT renvoyé.',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Refresh token invalide ou expiré.' })
  async refresh(@Body() refreshDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshDto.refreshToken);
  }

  // LOGOUT
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Déconnexion de l’utilisateur connecté (invalide le refresh token)" })
  @ApiResponse({ status: 200, description: 'Utilisateur déconnecté avec succès.' })
  async logout(@Request() req) {
    return this.authService.logout(req.user.userId);
  }

  //  PROFILE
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Obtenir le profil de l’utilisateur connecté" })
  @ApiResponse({
    status: 200,
    description: 'Profil utilisateur retourné.',
    type: User,
  })
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.userId);
  }
}
