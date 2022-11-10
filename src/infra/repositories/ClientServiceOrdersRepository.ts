import { Repository, DataSource, Not } from "typeorm";
import { ClientServiceOrder } from "../../domain/entities/ClientServiceOrder";
import { IClientServiceOrdersRepository } from "../../domain/repositories/IClientServiceOrdersRepository";

export class ClientServiceOrdersRepository implements IClientServiceOrdersRepository {
    private _baseRepository: Repository<ClientServiceOrder>;

    constructor(dataSource: DataSource) {
        this._baseRepository = dataSource.getRepository(ClientServiceOrder);
    }

    async getAllUnless(client_id: number): Promise<ClientServiceOrder[]> {        
        return await this._baseRepository.createQueryBuilder("clients_service_orders")
            .innerJoinAndSelect("clients_service_orders.client", "clients")
            .innerJoinAndSelect("clients_service_orders.service", "services")
            .where("client_id != :client_id AND status = 'opened'", { client_id: client_id })
            .getMany();
    }
    async insert(entity: ClientServiceOrder): Promise<ClientServiceOrder> {
        const _new = await this._baseRepository.create(entity);
        return await this._baseRepository.save(_new);
    }
    async update(entity: ClientServiceOrder): Promise<ClientServiceOrder> {
        const _old = await this._baseRepository.findOneBy({ id: entity.id });
        this._baseRepository.merge(_old, entity);
        return await this._baseRepository.save(entity);
    }
    async delete(id: number): Promise<void> {
        await this._baseRepository.delete(id);
    }
    async getById(id: number): Promise<ClientServiceOrder> {
        return await this._baseRepository.findOneByOrFail({ id });
    }
    async getAll(): Promise<ClientServiceOrder[]> {
        return await this._baseRepository.find({ order: { id: "ASC" } });
    }
    async getAllByClient(client_id: number): Promise<ClientServiceOrder[]> {        
        return await this._baseRepository.createQueryBuilder("clients_service_orders")
            .leftJoinAndSelect("clients_service_orders.service", "services")
            .leftJoinAndSelect("clients_service_orders.subcategory", "subcategories")
            .leftJoinAndSelect("clients_service_orders.category", "categories")
            .leftJoinAndSelect("clients_service_orders.professionalServiceOrders", "professional_service_orders")
            .leftJoinAndSelect("professional_service_orders.professional", "professionals")
            .where("client_id = :client_id AND status = 'opened'", { client_id: client_id })
            .getMany();
    }
}