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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../entities/user.entity");
class ArticleResponseDto {
    id;
    title;
    content;
    isPublished;
    author;
    createdAt;
    updatedAt;
}
exports.ArticleResponseDto = ArticleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Identifiant unique de l'article" }),
    __metadata("design:type", Number)
], ArticleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Introduction à NestJS', description: "Titre de l'article" }),
    __metadata("design:type", String)
], ArticleResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'NestJS est un framework Node.js basé sur TypeScript...',
        description: "Contenu complet de l'article",
    }),
    __metadata("design:type", String)
], ArticleResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: "Statut de publication (true = publié, false = brouillon)",
    }),
    __metadata("design:type", Boolean)
], ArticleResponseDto.prototype, "isPublished", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Auteur de l'article (objet User simplifié)",
        type: () => user_entity_1.User,
    }),
    __metadata("design:type", user_entity_1.User)
], ArticleResponseDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-10-17T12:34:56.000Z',
        description: "Date de création de l'article",
    }),
    __metadata("design:type", Date)
], ArticleResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-10-17T14:00:00.000Z',
        description: "Date de dernière mise à jour de l'article",
    }),
    __metadata("design:type", Date)
], ArticleResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=article-response.dto.js.map