import { IBaseRepository } from "./IBaseRepository";
import { Client } from "../entities/Client";

export interface IClientsRepository extends IBaseRepository<Client> {
    getByUserId(userId: number): Promise<Client>;
}