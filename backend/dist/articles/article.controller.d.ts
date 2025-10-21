import { ArticleService } from './article.service';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    findAll(req: any): Promise<import("../entities/article.entity").Article[]>;
    findOne(id: number): Promise<import("../entities/article.entity").Article>;
    create(req: any, createDto: CreateArticleDto): Promise<import("../entities/article.entity").Article>;
    update(id: number, updateDto: UpdateArticleDto, req: any): Promise<import("../entities/article.entity").Article>;
    remove(id: number, req: any): Promise<{
        message: string;
    }>;
    publish(id: number, req: any): Promise<import("../entities/article.entity").Article>;
}
