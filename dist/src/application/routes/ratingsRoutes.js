"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MySqlConnection_1 = __importDefault(require("../../infra/connections/MySqlConnection"));
const RatingsRepository_1 = require("../../infra/repositories/RatingsRepository");
const ratingsRoutes = (0, express_1.Router)();
ratingsRoutes.get("/professional/:professional_id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { professional_id } = request.params;
    const ratingsRepository = new RatingsRepository_1.RatingsRepository(MySqlConnection_1.default.MySqlDataSource);
    const rating = yield ratingsRepository.getSumByProfessionalId(parseInt(professional_id));
    response.status(200).json({ rating });
}));
exports.default = ratingsRoutes;
