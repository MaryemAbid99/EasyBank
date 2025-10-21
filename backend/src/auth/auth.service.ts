import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  //  REGISTER
  async register(email: string, password: string): Promise<User> {
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) throw new ConflictException('Cet email est déjà utilisé');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    return await this.usersRepository.save(newUser);
  }

  //  LOGIN
  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Email ou mot de passe invalide');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Email ou mot de passe invalide');

    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    //  Hachage du refresh token avant stockage
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    user.refreshToken = hashedRefresh;
    await this.usersRepository.save(user);

    return { accessToken, refreshToken };
  }

  // REFRESH TOKEN
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    if (!refreshToken) throw new UnauthorizedException('Refresh token manquant');

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersRepository.findOne({ where: { id: payload.sub } });
      if (!user || !user.refreshToken)
        throw new ForbiddenException('Refresh token invalide ou inexistant');
      const isValid = await bcrypt.compare(refreshToken, user.refreshToken || '');
      if (!isValid) throw new ForbiddenException('Refresh token invalide');

      const newAccessToken = this.jwtService.sign(
        { sub: user.id, email: user.email, role: user.role },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '1d',
        },
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new ForbiddenException('Refresh token expiré ou invalide');
    }
  }

  // LOGOUT
  async logout(userId: number): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Utilisateur introuvable');

    user.refreshToken = null;
    await this.usersRepository.save(user);

    return { message: 'Déconnexion réussie' };
  }
//  PROFILE
async getProfile(userId: number): Promise<Omit<User, 'password'>> {
  const user = await this.usersRepository.findOne({
    where: { id: userId },
    relations: ['articles'], 
  });
  if (!user) throw new NotFoundException('Utilisateur introuvable');
  const safeUser: Omit<User, 'password'> = {
    id: user.id,
    email: user.email,
    role: user.role,
    refreshToken: user.refreshToken,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    articles: user.articles,
  };

  return safeUser;
}



}
