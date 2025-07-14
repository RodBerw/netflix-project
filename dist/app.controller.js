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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getUsers(id) {
        try {
            return this.appService.getUsers(id);
        }
        catch (error) {
            console.error(error);
            return { message: "Error getting users: " + error };
        }
    }
    async createAndUpdateUser(body, id) {
        if (id) {
            try {
                return this.appService.updateUser(body, id);
            }
            catch (error) {
                console.error(error);
                return { message: "Error updating user: " + error };
            }
        }
        return this.appService.createUser(body);
    }
    async getMovies(id) {
        try {
            return this.appService.getMovies(id);
        }
        catch (error) {
            console.error(error);
            return { message: "Error getting movies: " + error };
        }
    }
    async createAndUpdateMovie(body, id) {
        if (id) {
            try {
                return this.appService.updateMovie(id, body);
            }
            catch (error) {
                console.error(error);
                return { message: "Error updating movie: " + error };
            }
        }
        return this.appService.createMovie(body);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)("/user:id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)("/user:id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createAndUpdateUser", null);
__decorate([
    (0, common_1.Get)("/movie:id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getMovies", null);
__decorate([
    (0, common_1.Post)("/movie:id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createAndUpdateMovie", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map