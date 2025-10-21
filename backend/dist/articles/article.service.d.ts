import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';
export declare class ArticleService {
    private readonly articleRepository;
    constructor(articleRepository: Repository<Article>);
    createArticle(title: string, content: string, user: User, isPublished?: boolean): Promise<Article>;
    getArticles(user: User): Promise<Article[]>;
    getArticleById(id: number): Promise<Article>;
    updateArticle(id: number, title?: string, content?: string, user?: User, isPublished?: boolean): Promise<Article>;
    deleteArticle(id: number, user: User): Promise<{
        message: string;
    }>;
    publishArticle(id: number, user: User): Promise<Article>;
}
