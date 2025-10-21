import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, IsBoolean } from 'class-validator';

export class UpdateArticleDto {
  @ApiPropertyOptional({
    description: "Nouveau titre de l'article (optionnel)",
    example: 'Mise à jour sur NestJS 11',
  })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Le titre doit contenir au moins 3 caractères.' })
  title?: string;

  @ApiPropertyOptional({
    description: "Nouveau contenu de l'article (optionnel)",
    example: 'Dans cette version, NestJS apporte de nombreuses améliorations...',
  })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Le contenu doit contenir au moins 10 caractères.' })
  content?: string;

  @ApiPropertyOptional({
    description: "Statut de publication (true = publié, false = brouillon)",
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
