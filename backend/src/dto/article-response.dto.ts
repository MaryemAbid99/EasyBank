import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class ArticleResponseDto {
  @ApiProperty({ example: 1, description: "Identifiant unique de l'article" })
  id: number;

  @ApiProperty({ example: 'Introduction à NestJS', description: "Titre de l'article" })
  title: string;

  @ApiProperty({
    example: 'NestJS est un framework Node.js basé sur TypeScript...',
    description: "Contenu complet de l'article",
  })
  content: string;

  @ApiProperty({
    example: false,
    description: "Statut de publication (true = publié, false = brouillon)",
  })
  isPublished: boolean;

  @ApiProperty({
    description: "Auteur de l'article (objet User simplifié)",
    type: () => User,
  })
  author: User;

  @ApiProperty({
    example: '2025-10-17T12:34:56.000Z',
    description: "Date de création de l'article",
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-10-17T14:00:00.000Z',
    description: "Date de dernière mise à jour de l'article",
  })
  updatedAt: Date;
}
