import { IBaseRepository } from "./IBaseRepository";
import { FavoriteProfessional } from "../entities/FavoriteProfessional";
import { ProfessionalWithRate } from "../dtos/ProfessionalWithRate";

export interface IFavoriteProfessionalsRepository extends IBaseRepository<FavoriteProfessional> {
    getWithRatings(userId: number): Promise<ProfessionalWithRate[]>;
}