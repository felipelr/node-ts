import { IBaseRepository } from "./IBaseRepository";
import { Subcategory } from "../entities/Subcategory";

export interface ISubcategoriesRepository extends IBaseRepository<Subcategory> {
    getByCategoryId(categoryId: number): Promise<Subcategory[]>
}