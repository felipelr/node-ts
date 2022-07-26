import { Repository, DataSource } from "typeorm";
import { Rating } from "../../domain/entities/Rating";
import { IRatingsRepository } from "../../domain/repositories/IRatingsRepository";

export class RatingsRepository implements IRatingsRepository {
    private _baseRepository: Repository<Rating>;

    constructor(dataSource: DataSource) {
        this._baseRepository = dataSource.getRepository(Rating);
    }

    async getByUserId(userId: number): Promise<Rating> {
        return await this._baseRepository.findOneBy({ id: userId });
    }
    async insert(entity: Rating): Promise<Rating> {
        const _new = await this._baseRepository.create(entity);
        return await this._baseRepository.save(_new);
    }
    async update(entity: Rating): Promise<Rating> {
        const _old = await this._baseRepository.findOneBy({ id: entity.id });
        this._baseRepository.merge(_old, entity);
        return await this._baseRepository.save(entity);
    }
    async delete(id: number): Promise<void> {
        await this._baseRepository.delete(id);
    }
    async getById(id: number): Promise<Rating> {
        return await this._baseRepository.findOneByOrFail({ id });
    }
    async getAll(): Promise<Rating[]> {
        return await this._baseRepository.find({ order: { id: "ASC" } });
    }
    async getSumByProfessionalId(professionalId: number): Promise<Rating> {
        const rating = await this._baseRepository
            .createQueryBuilder("ratings")
            .select("professional_id")
            .addSelect("AVG(rate)", "rating")
            .where("professional_id = :professional_id", { professional_id: professionalId })
            .groupBy("professional_id")
            .getRawOne();
        return rating;
    }
}