import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './articles/article.module';
import { UserController } from './users/user.controller';
import { User } from './entities/user.entity';
import { Article } from './entities/article.entity';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Article],
      synchronize: true,
    }),

    AuthModule,
    ArticleModule,
    UserModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
