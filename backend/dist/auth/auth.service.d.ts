import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    register(email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    logout(userId: number): Promise<{
        message: string;
    }>;
    getProfile(userId: number): Promise<Omit<User, 'password'>>;
}
