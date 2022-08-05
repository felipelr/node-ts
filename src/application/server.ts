import express from "express";
import cors from "cors";
import { expressjwt } from "express-jwt";
import dotenv from "dotenv";
import usersRoutes from "./routes/usersRoutes";
import professionalsRoutes from "./routes/professionalsRoutes";
import ratingsRoutes from "./routes/ratingsRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import clientServiceOrdersRoutes from "./routes/clientServiceOrdersRoutes";
import subcategoriesRoutes from "./routes/subcategoriesRoutes";
import servicesRoutes from "./routes/servicesRoutes";

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
    res.status(401).json({ message: "Token inválido" });
  } else {
    next(err);
  }
});

app.use("/v1/users", usersRoutes);
app.use("/v1/professionals", professionalsRoutes);
app.use("/v1/ratings", ratingsRoutes);
app.use("/v1/categories", categoriesRoutes);
app.use("/v1/clientServiceOrders", clientServiceOrdersRoutes);
app.use("/v1/subcategories", subcategoriesRoutes);
app.use("/v1/services", servicesRoutes);

app.listen(port, () => {
  console.log("servidor rodando");
});
