import { IBaseRepository } from "./IBaseRepository";
import { Rating } from "../entities/Rating";

export interface IRatingsRepository extends IBaseRepository<Rating> {
    getSumByProfessionalId(professionalId: number): Promise<Rating>;
}