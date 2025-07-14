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
exports.Movie = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_typescript_2 = require("sequelize-typescript");
const User_1 = require("./User");
let Movie = class Movie extends sequelize_typescript_1.Model {
};
exports.Movie = Movie;
__decorate([
    sequelize_typescript_2.PrimaryKey,
    sequelize_typescript_2.AutoIncrement,
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.INTEGER),
    __metadata("design:type", Number)
], Movie.prototype, "movie_id", void 0);
__decorate([
    (0, sequelize_typescript_2.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.INTEGER),
    __metadata("design:type", Number)
], Movie.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", String)
], Movie.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", String)
], Movie.prototype, "genre", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", String)
], Movie.prototype, "director", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.INTEGER),
    __metadata("design:type", Number)
], Movie.prototype, "year", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", String)
], Movie.prototype, "description", void 0);
exports.Movie = Movie = __decorate([
    sequelize_typescript_2.Table
], Movie);
//# sourceMappingURL=Movie.js.map