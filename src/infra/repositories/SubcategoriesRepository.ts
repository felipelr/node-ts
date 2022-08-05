import { Repository, DataSource } from "typeorm";
import { Subcategory } from "../../domain/entities/Subcategory";
import { ISubcategoriesRepository } from "../../domain/repositories/ISubcategoriesRepository";

export class SubcategoriesRepository implements ISubcategoriesRepository {
    private _baseRepository: Repository<Subcategory>;

    constructor(dataSource: DataSource) {
        this._baseRepository = dataSource.getRepository(Subcategory);
    }
    async insert(entity: Subcategory): Promise<Subcategory> {
        const _new = await this._baseRepository.create(entity);
        return await this._baseRepository.save(_new);
    }
    async update(entity: Subcategory): Promise<Subcategory> {
        const _old = await this._baseRepository.findOneBy({ id: entity.id });
        this._baseRepository.merge(_old, entity);
        return await this._baseRepository.save(entity);
    }
    async delete(id: number): Promise<void> {
        await this._baseRepository.delete(id);
    }
    async getById(id: number): Promise<Subcategory> {
        return await this._baseRepository.findOneByOrFail({ id });
    }
    async getAll(): Promise<Subcategory[]> {
        return await this._baseRepository.find({ order: { description: "ASC" } });
    }
    async getByCategoryId(categoryId: number): Promise<Subcategory[]> {
        return await this._baseRepository.find({ where: { category_id: categoryId }, order: { description: "ASC" } });
    }
}