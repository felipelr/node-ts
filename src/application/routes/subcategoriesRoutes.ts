import { Router, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import MySqlConnection from "../../infra/connections/MySqlConnection";
import { SubcategoriesRepository } from "../../infra/repositories/SubcategoriesRepository";
const subcategoriesRoutes = Router();

subcategoriesRoutes.get("/", async (request: JWTRequest, response: Response) => {
    const subcategoriesRepository = new SubcategoriesRepository(MySqlConnection.MySqlDataSource);
    const subcategories = await subcategoriesRepository.getAll();
    response.status(200).json({ subcategories });
});

subcategoriesRoutes.get("/category/:category_id", async (request: JWTRequest, response: Response) => {
    const { category_id } = request.params;
    const subcategoriesRepository = new SubcategoriesRepository(MySqlConnection.MySqlDataSource);
    const subcategories = await subcategoriesRepository.getByCategoryId(parseInt(category_id));
    response.status(200).json({ subcategories });
});

export default subcategoriesRoutes;
