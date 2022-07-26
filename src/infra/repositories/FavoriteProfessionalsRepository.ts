import { Repository, DataSource } from "typeorm";
import { ProfessionalWithRate } from "../../domain/dtos/ProfessionalWithRate";
import { FavoriteProfessional } from "../../domain/entities/FavoriteProfessional";
import { Professional } from "../../domain/entities/Professional";
import { Rating } from "../../domain/entities/Rating";
import { IFavoriteProfessionalsRepository } from "../../domain/repositories/IFavoriteProfessionalsRepository";

export class FavoriteProfessionalsRepository implements IFavoriteProfessionalsRepository {
    private _baseRepository: Repository<FavoriteProfessional>;

    constructor(dataSource: DataSource) {
        this._baseRepository = dataSource.getRepository(FavoriteProfessional);
    }

    async getByUserId(userId: number): Promise<FavoriteProfessional> {
        return await this._baseRepository.findOneBy({ id: userId });
    }
    async insert(entity: FavoriteProfessional): Promise<FavoriteProfessional> {
        const _new = await this._baseRepository.create(entity);
        return await this._baseRepository.save(_new);
    }
    async update(entity: FavoriteProfessional): Promise<FavoriteProfessional> {
        const _old = await this._baseRepository.findOneBy({ id: entity.id });
        this._baseRepository.merge(_old, entity);
        return await this._baseRepository.save(entity);
    }
    async delete(id: number): Promise<void> {
        await this._baseRepository.delete(id);
    }
    async getById(id: number): Promise<FavoriteProfessional> {
        return await this._baseRepository.findOneByOrFail({ id });
    }
    async getAll(): Promise<FavoriteProfessional[]> {
        return await this._baseRepository.find({ order: { id: "ASC" } });
    }
    async getWithRatings(userId: number): Promise<ProfessionalWithRate[]> {
        const result = await this._baseRepository.createQueryBuilder("favorite_professionals")
            .addSelect("AVG(r.rate)", "rating")
            .addSelect("COUNT(r.id)", "rating_count")
            .innerJoinAndSelect(Professional, "p", "p.id = favorite_professionals.professional_id")
            .leftJoinAndSelect(Rating, "r", "r.professional_id = p.id")
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
            } as ProfessionalWithRate
        })

        return professionals;
    }
}