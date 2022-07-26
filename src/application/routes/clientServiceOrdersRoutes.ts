import { Router, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import MySqlConnection from "../../infra/connections/MySqlConnection";
import { ClientServiceOrdersRepository } from "../../infra/repositories/ClientServiceOrdersRepository";
import { ClientsRepository } from "../../infra/repositories/ClientsRepository";
const clientServiceOrdersRoutes = Router();

clientServiceOrdersRoutes.get("/user/:user_id", async (request: JWTRequest, response: Response) => {
    const { user_id } = request.params;
    const clientServiceOrdersRepository = new ClientServiceOrdersRepository(MySqlConnection.MySqlDataSource);
    const clientsRepository = new ClientsRepository(MySqlConnection.MySqlDataSource);
    const client = await clientsRepository.getByUserId(parseInt(user_id));
    const clientsOrders = await clientServiceOrdersRepository.getAllUnless(client.id);
    response.status(200).json({ clientsOrders });
});

clientServiceOrdersRoutes.get("/getByClient/:client_id", async (request: JWTRequest, response: Response) => {
    const { client_id } = request.params;
    const clientServiceOrdersRepository = new ClientServiceOrdersRepository(MySqlConnection.MySqlDataSource);
    const clientsOrders = await clientServiceOrdersRepository.getAllByClient(parseInt(client_id));
    response.status(200).json({ clientsOrders });
});

clientServiceOrdersRoutes.get("/getByProfessional/:professional_id", async (request: JWTRequest, response: Response) => {
    const { professional_id } = request.params;
    const { client_id } = request.query;
    const clientServiceOrdersRepository = new ClientServiceOrdersRepository(MySqlConnection.MySqlDataSource);
    const clientsOrders = await clientServiceOrdersRepository.getAllByProfessional(parseInt(professional_id), parseInt(String(client_id)));
    response.status(200).json({ clientsOrders });
});

export default clientServiceOrdersRoutes;
