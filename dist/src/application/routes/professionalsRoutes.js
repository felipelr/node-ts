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
const FavoriteProfessionalsRepository_1 = require("../../infra/repositories/FavoriteProfessionalsRepository");
const professionalsRoutes = (0, express_1.Router)();
professionalsRoutes.get("/favorities/:user_id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = request.params;
    const favoriteProfessionalsRepository = new FavoriteProfessionalsRepository_1.FavoriteProfessionalsRepository(MySqlConnection_1.default.MySqlDataSource);
    const professionals = yield favoriteProfessionalsRepository.getWithRatings(parseInt(user_id));
    response.status(200).json({ professionals });
}));
exports.default = professionalsRoutes;
