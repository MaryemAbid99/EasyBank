import { User } from '../entities/user.entity';
export declare class ArticleResponseDto {
    id: number;
    title: string;
    content: string;
    isPublished: boolean;
    author: User;
    createdAt: Date;
    updatedAt: Date;
}
