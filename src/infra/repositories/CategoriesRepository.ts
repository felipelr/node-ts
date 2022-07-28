import { Repository, DataSource } from "typeorm";
import { Category } from "../../domain/entities/Category";
import { ICategoriesRepository } from "../../domain/repositories/ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
    private _baseRepository: Repository<Category>;

    constructor(dataSource: DataSource) {
        this._baseRepository = dataSource.getRepository(Category);
    }
    async insert(entity: Category): Promise<Category> {
        const _new = await this._baseRepository.create(entity);
        return await this._baseRepository.save(_new);
    }
    async update(entity: Category): Promise<Category> {
        const _old = await this._baseRepository.findOneBy({ id: entity.id });
        this._baseRepository.merge(_old, entity);
        return await this._baseRepository.save(entity);
    }
    async delete(id: number): Promise<void> {
        await this._baseRepository.delete(id);
    }
    async getById(id: number): Promise<Category> {
        return await this._baseRepository.findOneByOrFail({ id });
    }
    async getAll(): Promise<Category[]> {
        return await this._baseRepository.find({ order: { description: "ASC" } });
    }

}