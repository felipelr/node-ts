import { Router, Request, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import MySqlConnection from "../../infra/connections/MySqlConnection";
import { ProfessionalsRepository } from "../../infra/repositories/ProfessionalsRepository";
import { FavoriteProfessionalsRepository } from "../../infra/repositories/FavoriteProfessionalsRepository";
const professionalsRoutes = Router();

professionalsRoutes.get("/favorities/:user_id", async (request: JWTRequest, response: Response) => {
    const { user_id } = request.params;
    const favoriteProfessionalsRepository = new FavoriteProfessionalsRepository(MySqlConnection.MySqlDataSource);
    const professionals = await favoriteProfessionalsRepository.getWithRatings(parseInt(user_id));
    response.status(200).json({ professionals });
});

export default professionalsRoutes;
