import { User } from './user.entity';
export declare class Article {
    id: number;
    title: string;
    content: string;
    isPublished: boolean;
    author: User;
    createdAt: Date;
    updatedAt: Date;
}
