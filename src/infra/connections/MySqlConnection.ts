import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const MySqlDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: ["src/domain/entities/*.ts"], //dev
    //entities: ["dist/src/domain/entities/*.js"], //prod
});

MySqlDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

const connection = { MySqlDataSource }
export default connection;