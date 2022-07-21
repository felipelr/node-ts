import express from "express";
import cors from "cors";
import usersRoutes from "./routes/usersRoutes";
import { expressjwt } from "express-jwt";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.SERVER_PORT;
const jwtSecret = process.env.JWT_SECRET;
const app = express();

app.use(cors())
app.use(express.json());

app.use(expressjwt({
  secret: jwtSecret,
  algorithms: ["HS256"],  
}).unless({ path: ["/v1/users/login"] }));

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({message: "Token inválido"});
  } else {
    next(err);
  }
});

app.use("/v1/users", usersRoutes);

app.listen(port, () => {
  console.log("servidor rodando");
});
