import { Repository, DataSource } from "typeorm";
import { Client } from "../../domain/entities/Client";
import { IClientsRepository } from "../../domain/repositories/IClientsRepository";

export class ClientsRepository implements IClientsRepository {
    private _baseRepository: Repository<Client>;

    constructor(dataSource: DataSource) {
        this._baseRepository = dataSource.getRepository(Client);
    }

    async getByUserId(userId: number): Promise<Client> {
        return await this._baseRepository.findOneBy({ id: userId });
    }
    async insert(entity: Client): Promise<Client> {
        const _new = await this._baseRepository.create(entity);
        return await this._baseRepository.save(_new);
    }
    async update(entity: Client): Promise<Client> {
        const _old = await this._baseRepository.findOneBy({ id: entity.id });
        this._baseRepository.merge(_old, entity);
        return await this._baseRepository.save(entity);
    }
    async delete(id: number): Promise<void> {
        await this._baseRepository.delete(id);
    }
    async getById(id: number): Promise<Client> {
        return await this._baseRepository.findOneByOrFail({ id });
    }
    async getAll(): Promise<Client[]> {
        return await this._baseRepository.find({ order: { id: "ASC" } });
    }

}