"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_jwt_1 = require("express-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const professionalsRoutes_1 = __importDefault(require("./routes/professionalsRoutes"));
const ratingsRoutes_1 = __importDefault(require("./routes/ratingsRoutes"));
const categoriesRoutes_1 = __importDefault(require("./routes/categoriesRoutes"));
const clientServiceOrdersRoutes_1 = __importDefault(require("./routes/clientServiceOrdersRoutes"));
const subcategoriesRoutes_1 = __importDefault(require("./routes/subcategoriesRoutes"));
const servicesRoutes_1 = __importDefault(require("./routes/servicesRoutes"));
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
const jwtSecret = process.env.JWT_SECRET;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_jwt_1.expressjwt)({
    secret: jwtSecret,
    algorithms: ["HS256"],
}).unless({ path: ["/v1/users/login"] }));
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ message: "Token inválido" });
    }
    else {
        next(err);
    }
});
app.use("/v1/users", usersRoutes_1.default);
app.use("/v1/professionals", professionalsRoutes_1.default);
app.use("/v1/ratings", ratingsRoutes_1.default);
app.use("/v1/categories", categoriesRoutes_1.default);
app.use("/v1/clientServiceOrders", clientServiceOrdersRoutes_1.default);
app.use("/v1/subcategories", subcategoriesRoutes_1.default);
app.use("/v1/services", servicesRoutes_1.default);
app.listen(port, () => {
    console.log("servidor rodando");
});
