import { IBaseRepository } from "./IBaseRepository";
import { ClientServiceOrder } from "../entities/ClientServiceOrder";

export interface IClientServiceOrdersRepository extends IBaseRepository<ClientServiceOrder> {
    getAllUnless(clientId: number): Promise<ClientServiceOrder[]>;
}