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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("../dto/create-user.dto");
const login_user_dto_1 = require("../dto/login-user.dto");
const refresh_token_dto_1 = require("../dto/refresh-token.dto");
const user_entity_1 = require("../entities/user.entity");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(createUserDto) {
        return this.authService.register(createUserDto.email, createUserDto.password);
    }
    async login(loginUserDto) {
        return this.authService.login(loginUserDto.email, loginUserDto.password);
    }
    async refresh(refreshDto) {
        return this.authService.refreshToken(refreshDto.refreshToken);
    }
    async logout(req) {
        return this.authService.logout(req.user.userId);
    }
    async getProfile(req) {
        return this.authService.getProfile(req.user.userId);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: "Inscription d’un nouvel utilisateur" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Utilisateur créé avec succès.', type: user_entity_1.User }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Email déjà utilisé ou données invalides.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: "Connexion utilisateur (retourne access et refresh tokens)" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Connexion réussie, tokens renvoyés.',
        schema: {
            example: {
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Identifiants invalides.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiOperation)({ summary: "Rafraîchir le token JWT (nécessite un refresh token valide)" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Nouveau token JWT renvoyé.',
        schema: {
            example: {
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Refresh token invalide ou expiré.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Déconnexion de l’utilisateur connecté (invalide le refresh token)" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Utilisateur déconnecté avec succès.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Obtenir le profil de l’utilisateur connecté" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profil utilisateur retourné.',
        type: user_entity_1.User,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map