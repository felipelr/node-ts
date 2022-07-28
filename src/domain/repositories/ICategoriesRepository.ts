import { IBaseRepository } from "./IBaseRepository";
import { Category } from "../entities/Category";

export interface ICategoriesRepository extends IBaseRepository<Category> {
    
}