import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: "Titre de l'article",
    example: 'Les avantages de NestJS',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le titre est obligatoire.' })
  @MinLength(3, { message: 'Le titre doit contenir au moins 3 caractères.' })
  title: string;

  @ApiProperty({
    description: "Contenu de l'article",
    example: 'NestJS est un framework progressif basé sur TypeScript...',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le contenu est obligatoire.' })
  @MinLength(10, { message: 'Le contenu doit contenir au moins 10 caractères.' })
  content: string;

  @ApiProperty({
    description: 'Statut de publication de l’article (facultatif)',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
