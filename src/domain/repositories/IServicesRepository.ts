import { IBaseRepository } from "./IBaseRepository";
import { Service } from "../entities/Service";

export interface IServicesRepository extends IBaseRepository<Service> {
    getBySubcategoryId(subcategoryId: number): Promise<Service[]>
}