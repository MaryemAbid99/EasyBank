"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("../entities/article.entity");
const user_entity_1 = require("../entities/user.entity");
let ArticleService = class ArticleService {
    articleRepository;
    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }
    async createArticle(title, content, user, isPublished = false) {
        if (!user)
            throw new common_1.ForbiddenException('Utilisateur non authentifié.');
        try {
            const article = this.articleRepository.create({
                title,
                content,
                author: user,
                isPublished,
            });
            return await this.articleRepository.save(article);
        }
        catch {
            throw new common_1.InternalServerErrorException('Erreur lors de la création de l’article.');
        }
    }
    async getArticles(user) {
        return this.articleRepository.find({
            where: user.role === user_entity_1.UserRole.ADMIN ? {} : { isPublished: true },
            relations: ['author'],
            order: { createdAt: 'DESC' },
        });
    }
    async getArticleById(id) {
        const article = await this.articleRepository.findOne({
            where: { id },
            relations: ['author'],
        });
        if (!article)
            throw new common_1.NotFoundException('Article introuvable');
        return article;
    }
    async updateArticle(id, title, content, user, isPublished) {
        const article = await this.getArticleById(id);
        if (!user)
            throw new common_1.ForbiddenException('Utilisateur non trouvé');
        if (article.author.id !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException("Tu n'as pas le droit de modifier cet article !");
        }
        if (title !== undefined)
            article.title = title;
        if (content !== undefined)
            article.content = content;
        if (isPublished !== undefined)
            article.isPublished = isPublished;
        return await this.articleRepository.save(article);
    }
    async deleteArticle(id, user) {
        const article = await this.getArticleById(id);
        if (article.author.id !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException("Tu n'as pas le droit de supprimer cet article !");
        }
        await this.articleRepository.remove(article);
        return { message: 'Article supprimé avec succès' };
    }
    async publishArticle(id, user) {
        const article = await this.getArticleById(id);
        if (user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Seul un admin peut publier un article !');
        }
        article.isPublished = true;
        return await this.articleRepository.save(article);
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArticleService);
//# sourceMappingURL=article.service.js.map