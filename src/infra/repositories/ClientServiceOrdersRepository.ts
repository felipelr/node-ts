import { Repository, DataSource, Not } from "typeorm";
import { City } from "../../domain/entities/City";
import { ClientServiceOrder } from "../../domain/entities/ClientServiceOrder";
import { ProfessionalCity } from "../../domain/entities/ProfessionalCity";
import { ProfessionalService } from "../../domain/entities/ProfessionalService";
import { ProfessionalServiceOrder } from "../../domain/entities/ProfessionalServiceOrder";
import { IClientServiceOrdersRepository } from "../../domain/repositories/IClientServiceOrdersRepository";

export class ClientServiceOrdersRepository implements IClientServiceOrdersRepository {
    private _baseRepository: Repository<ClientServiceOrder>;

    constructor(private dataSource: DataSource) {
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
    async getAllByProfessional(professional_id: number, client_id: number): Promise<ClientServiceOrder[]> {
        const result1 = await this.dataSource
            .getRepository(ProfessionalService)
            .createQueryBuilder("professional_services")
            .innerJoinAndSelect("professional_services.service", "services")
            .innerJoinAndSelect("services.subcategory", "subcategories")
            .innerJoinAndSelect("subcategories.category", "categories")
            .where("professional_services.active = 1 AND professional_services.professional_id = :professional_id", { professional_id: professional_id })
            .andWhere("services.active = 1")
            .andWhere("subcategories.active = 1")
            .andWhere("categories.active = 1")
            .getMany();

        if (result1.length > 0) {
            const services = result1.map(item => item.service.id);
            const subcategories = result1.map(item => item.service.subcategory.id);
            const categories = result1.map(item => item.service.subcategory.category.id);

            const professionalCities = await this.dataSource
                .getRepository(ProfessionalCity)
                .createQueryBuilder("professional_cities")
                .where("professional_id = :professional_id", { professional_id: professional_id })
                .getMany();

            const cities = professionalCities?.map(item => item.city_id) || []

            const result2 = await this.dataSource
                .getRepository(ProfessionalServiceOrder)
                .createQueryBuilder("professionals_service_orders")
                .innerJoinAndSelect("professionals_service_orders.clientServiceOrder", "clients_service_orders")
                .where("professional_id = :professional_id", { professional_id: professional_id })
                .andWhere("status = 'opened'")
                .getMany();

            if (result2.length > 0) {
                const professionalOrders = result2.map(item => item.clientServiceOrder.id);

                return await this._baseRepository.createQueryBuilder("clients_service_orders")
                    .leftJoinAndSelect("clients_service_orders.service", "services")
                    .leftJoinAndSelect("clients_service_orders.subcategory", "subcategories")
                    .leftJoinAndSelect("clients_service_orders.category", "categories")
                    .leftJoinAndSelect("clients_service_orders.client", "clients")
                    .where("client_id != :client_id", { client_id: client_id })
                    .andWhere("status = 'opened'")
                    .andWhere("city_id IN (:cities)", { cities: cities })
                    .orWhere("(quantity_professionals < quantity AND clients_service_orders.id IN (:professionalOrders))", { professionalOrders: professionalOrders })
                    .orWhere("(clients_service_orders.service_id IN (:services) OR clients_service_orders.subcategory_id IN (:subcategories) OR clients_service_orders.category_id IN (:categories) )", { services: services, subcategories: subcategories, categories: categories })
                    .getMany();
            }

            return await this._baseRepository.createQueryBuilder("clients_service_orders")
                .leftJoinAndSelect("clients_service_orders.service", "services")
                .leftJoinAndSelect("clients_service_orders.subcategory", "subcategories")
                .leftJoinAndSelect("clients_service_orders.category", "categories")
                .leftJoinAndSelect("clients_service_orders.client", "clients")
                .where("client_id != :client_id", { client_id: client_id })
                .andWhere("status = 'opened'")
                .andWhere("city_id IN (:cities)", { cities: cities })
                .orWhere("(clients_service_orders.service_id IN (:services) OR clients_service_orders.subcategory_id IN (:subcategories) OR clients_service_orders.category_id IN (:categories) )", { services: services, subcategories: subcategories, categories: categories })
                .getMany();
        }

        return []
    }
}