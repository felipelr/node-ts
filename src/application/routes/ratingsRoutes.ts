import { Router, Request, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import MySqlConnection from "../../infra/connections/MySqlConnection";
import { RatingsRepository } from "../../infra/repositories/RatingsRepository";
const ratingsRoutes = Router();

ratingsRoutes.get("/professional/:professional_id", async (request: JWTRequest, response: Response) => {
    const { professional_id } = request.params;
    const ratingsRepository = new RatingsRepository(MySqlConnection.MySqlDataSource);
    const rating = await ratingsRepository.getSumByProfessionalId(parseInt(professional_id));
    response.status(200).json({ rating });
});

export default ratingsRoutes;
