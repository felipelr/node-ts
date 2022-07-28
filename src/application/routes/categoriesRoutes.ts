import { Router, Request, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import MySqlConnection from "../../infra/connections/MySqlConnection";
import { CategoriesRepository } from "../../infra/repositories/CategoriesRepository";
const categoriesRoutes = Router();

categoriesRoutes.get("/", async (request: JWTRequest, response: Response) => {
    const categoriesRepository = new CategoriesRepository(MySqlConnection.MySqlDataSource);
    const categories = await categoriesRepository.getAll();
    response.status(200).json({ categories });
});

export default categoriesRoutes;
