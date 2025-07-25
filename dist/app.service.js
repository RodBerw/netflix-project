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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const Movie_1 = require("./models/Movie");
const User_1 = require("./models/User");
let AppService = class AppService {
    constructor(movie, user) {
        this.movie = movie;
        this.user = user;
    }
    async getUsers(id) {
        try {
            if (id) {
                const user = await this.user.findOne({ where: { id } });
                return user;
            }
            const users = await this.user.findAll();
            return users;
        }
        catch (error) {
            return error;
        }
    }
    async createUser(body) {
        try {
            const user = await this.user.create(body);
            return user;
        }
        catch (error) {
            return error;
        }
    }
    async updateUser(body, id) {
        try {
            const user = await this.user.update(body, { where: { id } });
            return user;
        }
        catch (error) {
            return error;
        }
    }
    async getMovies(id) {
        try {
            if (id) {
                const movie = await this.movie.findOne({ where: { id } });
                return movie;
            }
            const movies = await this.movie.findAll();
            return movies;
        }
        catch (error) {
            return error;
        }
    }
    async createMovie(body) {
        try {
            const movie = await this.movie.create(body);
            return movie;
        }
        catch (error) {
            return error;
        }
    }
    async updateMovie(body, id) {
        try {
            const movie = await this.movie.update(body, { where: { id } });
            return movie;
        }
        catch (error) {
            return error;
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(Movie_1.Movie)),
    __param(1, (0, sequelize_1.InjectModel)(User_1.User)),
    __metadata("design:paramtypes", [Object, Object])
], AppService);
//# sourceMappingURL=app.service.js.map