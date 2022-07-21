import { IBaseRepository } from "./IBaseRepository";
import { Professional } from "../entities/Professional";

export interface IProfessionalsRepository extends IBaseRepository<Professional> {
    getByUserId(userId: number): Promise<Professional>;
    getProfessionalsFavorities(userId: number): Promise<Professional[]>;
}