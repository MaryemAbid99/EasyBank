import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { User } from '../entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<User>;
    login(loginUserDto: LoginUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshDto: RefreshTokenDto): Promise<{
        accessToken: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
    getProfile(req: any): Promise<Omit<User, "password">>;
}
