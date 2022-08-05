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
const ServicesRepository_1 = require("../../infra/repositories/ServicesRepository");
const servicesRoutes = (0, express_1.Router)();
servicesRoutes.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const servicesRepository = new ServicesRepository_1.ServicesRepository(MySqlConnection_1.default.MySqlDataSource);
    const services = yield servicesRepository.getAll();
    response.status(200).json({ services });
}));
servicesRoutes.get("/subcategory/:subcategory_id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { subcategory_id } = request.params;
    const servicesRepository = new ServicesRepository_1.ServicesRepository(MySqlConnection_1.default.MySqlDataSource);
    const services = yield servicesRepository.getBySubcategoryId(parseInt(subcategory_id));
    response.status(200).json({ services });
}));
exports.default = servicesRoutes;
