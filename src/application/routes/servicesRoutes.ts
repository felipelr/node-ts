import { Router, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import MySqlConnection from "../../infra/connections/MySqlConnection";
import { ServicesRepository } from "../../infra/repositories/ServicesRepository";
const servicesRoutes = Router();

servicesRoutes.get("/", async (request: JWTRequest, response: Response) => {
    const servicesRepository = new ServicesRepository(MySqlConnection.MySqlDataSource);
    const services = await servicesRepository.getAll();
    response.status(200).json({ services });
});

servicesRoutes.get("/subcategory/:subcategory_id", async (request: JWTRequest, response: Response) => {
    const { subcategory_id } = request.params;
    const servicesRepository = new ServicesRepository(MySqlConnection.MySqlDataSource);
    const services = await servicesRepository.getBySubcategoryId(parseInt(subcategory_id));
    response.status(200).json({ services });
});

export default servicesRoutes;
