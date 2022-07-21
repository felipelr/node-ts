import { Router, Request, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import jwt from "jsonwebtoken";
import MySqlConnection from "../../infra/connections/MySqlConnection";
import { UsersRepository } from "../../infra/repositories/UsersRepository";
import { ClientsRepository } from "../../infra/repositories/ClientsRepository";
import { ProfessionalsRepository } from "../../infra/repositories/ProfessionalsRepository";
import { LoginUseCase } from "../../domain/useCases/LoginUseCase/LoginUseCase";
const usersRoutes = Router();

usersRoutes.get("/", async (request: JWTRequest, response: Response) => {
  const userRepository = new UsersRepository(MySqlConnection.MySqlDataSource);
  const users = (await userRepository.getAll()).map(user => { return { id: user.id, email: user.email } });
  response.status(200).json({ users });
});

usersRoutes.get("/validateToken", async (request: JWTRequest, response: Response) => {
  if (request.auth) {
    const { id } = request.auth;
    const usersRepository = new UsersRepository(MySqlConnection.MySqlDataSource);
    const clientsRepository = new ClientsRepository(MySqlConnection.MySqlDataSource);
    const professionalsRepository = new ProfessionalsRepository(MySqlConnection.MySqlDataSource);
    try {
      const user = await usersRepository.getById(parseInt(id));
      const client = await clientsRepository.getByUserId(user.id);
      const professional = await professionalsRepository.getByUserId(user.id);
      response.status(200).json({ id: user.id, email: user.email, client, professional });
    }
    catch (err) {
      response.status(500).json({ message: err.message });
    }
  }
  else {
    response.status(404).json({ message: "Token inválido" });
  }
});

usersRoutes.post("/login", async (request: JWTRequest, response: Response) => {
  const { email, password } = request.body;
  const usersRepository = new UsersRepository(MySqlConnection.MySqlDataSource);
  const clientsRepository = new ClientsRepository(MySqlConnection.MySqlDataSource);
  const professionalsRepository = new ProfessionalsRepository(MySqlConnection.MySqlDataSource);
  const loginUseCase = new LoginUseCase(usersRepository, clientsRepository, professionalsRepository);

  try {
    const loginResult = await loginUseCase.execute({ email, password });
    if (loginResult) {
      const sub = { id: loginResult.id, email: loginResult.email }
      const accessToken = jwt.sign(sub, process.env.JWT_SECRET, { expiresIn: "30m" });
      response.status(200).json({ token: accessToken, user: { ...loginResult } });
    }
    else {
      response.status(401).json({ message: "Email e/ou senha inválidos." });
    }
  }
  catch (err) {
    response.status(500).json({ message: err.message });
  }
});

export default usersRoutes;
