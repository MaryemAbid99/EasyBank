import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole, User } from '../entities/user.entity';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Articles')
@ApiBearerAuth()
@Controller('articles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  //  GET ALL
  @Get()
  @ApiOperation({
    summary:
      'Récupérer tous les articles (publiés pour USER, tous pour ADMIN)',
  })
  async findAll(@Req() req) {
    return this.articleService.getArticles(req.user);
  }

  //  GET ONE
  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un article par son ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.getArticleById(id);
  }

  //  CREATE (ADMIN)
  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Créer un nouvel article (ADMIN uniquement)' })
  async create(@Req() req, @Body() createDto: CreateArticleDto) {
    const user = req.user as User;
    return this.articleService.createArticle(
      createDto.title,
      createDto.content,
      user,
      createDto.isPublished ?? false,
    );
  }

  //  UPDATE (ADMIN)
  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Modifier un article (ADMIN)' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateArticleDto,
    @Req() req,
  ) {
    const user = req.user as User;
    return this.articleService.updateArticle(
      id,
      updateDto.title,
      updateDto.content,
      user,
      updateDto.isPublished,
    );
  }

  // DELETE (ADMIN)
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Supprimer un article (ADMIN)' })
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const user = req.user as User;
    return this.articleService.deleteArticle(id, user);
  }

  // PUBLISH (ADMIN)
  @Patch(':id/publish')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Publier un article (ADMIN uniquement)' })
  async publish(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const user = req.user as User;
    return this.articleService.publishArticle(id, user);
  }
}
