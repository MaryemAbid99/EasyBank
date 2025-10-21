import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: "Adresse e-mail de l'utilisateur",
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Adresse e-mail invalide.' })
  email: string;

  @ApiProperty({
    description: "Mot de passe de l'utilisateur",
    example: 'mypassword123',
  })
  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
  password: string;
}
