import { Repository, DataSource } from "typeorm";
import { Professional } from "../../domain/entities/Professional";
import { IProfessionalsRepository } from "../../domain/repositories/IProfessionalsRepository";

export class ProfessionalsRepository implements IProfessionalsRepository {
    private _baseRepository: Repository<Professional>;

    constructor(dataSource: DataSource) {
        this._baseRepository = dataSource.getRepository(Professional);
    }

    async getByUserId(userId: number): Promise<Professional> {
        return await this._baseRepository.findOneBy({ user_id: userId });
    }
    async insert(entity: Professional): Promise<Professional> {
        const _new = await this._baseRepository.create(entity);
        return await this._baseRepository.save(_new);
    }
    async update(entity: Professional): Promise<Professional> {
        const _old = await this._baseRepository.findOneBy({ id: entity.id });
        this._baseRepository.merge(_old, entity);
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
}