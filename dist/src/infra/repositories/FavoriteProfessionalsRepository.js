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
exports.FavoriteProfessionalsRepository = void 0;
const FavoriteProfessional_1 = require("../../domain/entities/FavoriteProfessional");
const Professional_1 = require("../../domain/entities/Professional");
const Rating_1 = require("../../domain/entities/Rating");
class FavoriteProfessionalsRepository {
    constructor(dataSource) {
        this._baseRepository = dataSource.getRepository(FavoriteProfessional_1.FavoriteProfessional);
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
    getWithRatings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._baseRepository.createQueryBuilder("favorite_professionals")
                .addSelect("AVG(r.rate)", "rating")
                .addSelect("COUNT(r.id)", "rating_count")
                .innerJoinAndSelect(Professional_1.Professional, "p", "p.id = favorite_professionals.professional_id")
                .leftJoinAndSelect(Rating_1.Rating, "r", "r.professional_id = p.id")
                .where("favorite_professionals.user_id = :user_id", { user_id: userId })
                .groupBy("p.id")
                .getRawMany();
            const professionals = result.map(item => {
                return {
                    id: item["p_id"],
                    name: item["p_name"],
                    description: item["p_description"],
                    photo: item["p_photo"],
                    rate: item["rating"],
                    rate_count: item["rating_count"]
                };
            });
            return professionals;
        });
    }
}
exports.FavoriteProfessionalsRepository = FavoriteProfessionalsRepository;
