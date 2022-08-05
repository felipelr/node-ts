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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingsRepository = void 0;
const Rating_1 = require("../../domain/entities/Rating");
class RatingsRepository {
    constructor(dataSource) {
        this._baseRepository = dataSource.getRepository(Rating_1.Rating);
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._baseRepository.findOneBy({ id: userId });
        });
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
    getSumByProfessionalId(professionalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rating = yield this._baseRepository
                .createQueryBuilder("ratings")
                .select("professional_id")
                .addSelect("AVG(rate)", "rating")
                .where("professional_id = :professional_id", { professional_id: professionalId })
                .groupBy("professional_id")
                .getRawOne();
            return rating;
        });
    }
}
exports.RatingsRepository = RatingsRepository;
