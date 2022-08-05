import { Repository, DataSource } from "typeorm";
import { Service } from "../../domain/entities/Service";
import { IServicesRepository } from "../../domain/repositories/IServicesRepository";

export class ServicesRepository implements IServicesRepository {
    private _baseRepository: Repository<Service>;

    constructor(dataSource: DataSource) {
        this._baseRepository = dataSource.getRepository(Service);
    }
    async insert(entity: Service): Promise<Service> {
        const _new = await this._baseRepository.create(entity);
        return await this._baseRepository.save(_new);
    }
    async update(entity: Service): Promise<Service> {
        const _old = await this._baseRepository.findOneBy({ id: entity.id });
        this._baseRepository.merge(_old, entity);
        return await this._baseRepository.save(entity);
    }
    async delete(id: number): Promise<void> {
        await this._baseRepository.delete(id);
    }
    async getById(id: number): Promise<Service> {
        return await this._baseRepository.findOneByOrFail({ id });
    }
    async getAll(): Promise<Service[]> {
        return await this._baseRepository.find({ order: { description: "ASC" } });
    }
    async getBySubcategoryId(subcategoryId: number): Promise<Service[]> {
        return await this._baseRepository.find({ where: { subcategory_id: subcategoryId }, order: { description: "ASC" } });
    }
}