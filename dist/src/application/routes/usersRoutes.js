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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const MySqlConnection_1 = __importDefault(require("../../infra/connections/MySqlConnection"));
const UsersRepository_1 = require("../../infra/repositories/UsersRepository");
const ClientsRepository_1 = require("../../infra/repositories/ClientsRepository");
const ProfessionalsRepository_1 = require("../../infra/repositories/ProfessionalsRepository");
const LoginUseCase_1 = require("../../domain/useCases/LoginUseCase/LoginUseCase");
const usersRoutes = (0, express_1.Router)();
usersRoutes.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = new UsersRepository_1.UsersRepository(MySqlConnection_1.default.MySqlDataSource);
    const users = (yield userRepository.getAll()).map(user => { return { id: user.id, email: user.email }; });
    response.status(200).json({ users });
}));
usersRoutes.get("/validateToken", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.auth) {
        const { id } = request.auth;
        const usersRepository = new UsersRepository_1.UsersRepository(MySqlConnection_1.default.MySqlDataSource);
        const clientsRepository = new ClientsRepository_1.ClientsRepository(MySqlConnection_1.default.MySqlDataSource);
        const professionalsRepository = new ProfessionalsRepository_1.ProfessionalsRepository(MySqlConnection_1.default.MySqlDataSource);
        try {
            const user = yield usersRepository.getById(parseInt(id));
            const client = yield clientsRepository.getByUserId(user.id);
            const professional = yield professionalsRepository.getByUserId(user.id);
            response.status(200).json({ id: user.id, email: user.email, client, professional });
        }
        catch (err) {
            response.status(500).json({ message: err.message });
        }
    }
    else {
        response.status(404).json({ message: "Token inválido" });
    }
}));
usersRoutes.post("/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    const usersRepository = new UsersRepository_1.UsersRepository(MySqlConnection_1.default.MySqlDataSource);
    const clientsRepository = new ClientsRepository_1.ClientsRepository(MySqlConnection_1.default.MySqlDataSource);
    const professionalsRepository = new ProfessionalsRepository_1.ProfessionalsRepository(MySqlConnection_1.default.MySqlDataSource);
    const loginUseCase = new LoginUseCase_1.LoginUseCase(usersRepository, clientsRepository, professionalsRepository);
    try {
        const loginResult = yield loginUseCase.execute({ email, password });
        if (loginResult) {
            const sub = { id: loginResult.id, email: loginResult.email };
            const accessToken = jsonwebtoken_1.default.sign(sub, process.env.JWT_SECRET, { expiresIn: "12h" });
            response.status(200).json({ token: accessToken, user: Object.assign({}, loginResult) });
        }
        else {
            response.status(401).json({ message: "Email e/ou senha inválidos." });
        }
    }
    catch (err) {
        response.status(500).json({ message: err.message });
    }
}));
exports.default = usersRoutes;
