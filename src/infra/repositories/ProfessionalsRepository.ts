import { Repository, DataSource } from "typeorm";
import { Professional } from "../../domain/entities/Professional";
import { IProfessionalsRepository } from "../../domain/repositories/IProfessionalsRepository";

export class ProfessionalsRepository implements IProfessionalsRepository {
    private _baseRepository: Repository<Professional>;

    constructor(dataSource: DataSource) {
        this._baseRepository = dataSource.getRepository(Professional);
    }

    async getByUserId(userId: number): Promise<Professional> {
        return await this._baseRepository.findOneBy({ id: userId });
    }
    async save(entity: Professional): Promise<Professional> {
        return await this._baseRepository.save(entity);
    }
    async delete(id: number): Promise<void> {
        await this._baseRepository.delete(id);
    }
    async getById(id: number): Promise<Professional> {
        return await this._baseRepository.findOneByOrFail({ id });
    }
    async getAll(): Promise<Professional[]> {
        return await this._baseRepository.find({ order: { id: "ASC" } });
    }
    async getProfessionalsFavorities(userId: number): Promise<Professional[]>{
        const result = await this._baseRepository.createQueryBuilder("professionals")
        .leftJoinAndSelect("favorite_professionals", "favorite", "favorite.professional_id = professionals.id")
        .where("professionals.user_id = :user_id", { user_id: userId })
        .getMany();

        return result;
    }
}