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
exports.UsersRepository = void 0;
const User_1 = require("../../domain/entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsersRepository {
    constructor(dataSource) {
        this._baseRepository = dataSource.getRepository(User_1.User);
    }
    insert(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const _new = yield this._baseRepository.create(entity);
            return yield this._baseRepository.save(_new);
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const _old = yield this._baseRepository.findOneBy({ id: entity.id });
            this._baseRepository.merge(_old, entity);
            return yield this._baseRepository.save(entity);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._baseRepository.delete(id);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._baseRepository.findOneByOrFail({ id });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._baseRepository.find({ order: { id: "ASC" } });
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._baseRepository.findOneByOrFail({ email });
            const verified = yield bcryptjs_1.default.compare(password, user.password);
            if (verified)
                return user;
            throw new Error("Email e/ou senha inválidos.");
        });
    }
}
exports.UsersRepository = UsersRepository;
