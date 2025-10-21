import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UserController {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getAllUsers(): Promise<User[]>;
    getProfile(req: any): Promise<any>;
}
