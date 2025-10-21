import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  // CREATE
  async createArticle(
    title: string,
    content: string,
    user: User,
    isPublished = false,
  ): Promise<Article> {
    if (!user) throw new ForbiddenException('Utilisateur non authentifié.');

try {
  const article = this.articleRepository.create({
    title,
    content,
    author: user,
    isPublished,
  });
  return await this.articleRepository.save(article);
} catch {
  throw new InternalServerErrorException('Erreur lors de la création de l’article.');
}


  }

  //  GET ALL
  async getArticles(user: User): Promise<Article[]> {
    return this.articleRepository.find({
      where: user.role === UserRole.ADMIN ? {} : { isPublished: true },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  //  GET BY ID
  async getArticleById(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!article) throw new NotFoundException('Article introuvable');
    return article;
  }

  //  UPDATE
  async updateArticle(
    id: number,
    title?: string,
    content?: string,
    user?: User,
    isPublished?: boolean,
  ): Promise<Article> {
    const article = await this.getArticleById(id);
    if (!user) throw new ForbiddenException('Utilisateur non trouvé');

    if (article.author.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException("Tu n'as pas le droit de modifier cet article !");
    }

    if (title !== undefined) article.title = title;
    if (content !== undefined) article.content = content;
    if (isPublished !== undefined) article.isPublished = isPublished;

    return await this.articleRepository.save(article);
  }

  //  DELETE
  async deleteArticle(id: number, user: User): Promise<{ message: string }> {
    const article = await this.getArticleById(id);
    if (article.author.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException("Tu n'as pas le droit de supprimer cet article !");
    }
    await this.articleRepository.remove(article);
    return { message: 'Article supprimé avec succès' };
  }

  // PUBLISH
  async publishArticle(id: number, user: User): Promise<Article> {
    const article = await this.getArticleById(id);
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Seul un admin peut publier un article !');
    }
    article.isPublished = true;
    return await this.articleRepository.save(article);
  }
}
