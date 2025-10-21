import { Article } from './article.entity';
export declare enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
    articles: Article[];
}
