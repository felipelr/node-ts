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
exports.Rating = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
let Rating = class Rating extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: "professional_id" }),
    __metadata("design:type", Number)
], Rating.prototype, "professional_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "client_id" }),
    __metadata("design:type", Number)
], Rating.prototype, "client_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "call_id" }),
    __metadata("design:type", Number)
], Rating.prototype, "call_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "rate" }),
    __metadata("design:type", Number)
], Rating.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description" }),
    __metadata("design:type", String)
], Rating.prototype, "description", void 0);
Rating = __decorate([
    (0, typeorm_1.Entity)({ name: "ratings" })
], Rating);
exports.Rating = Rating;
