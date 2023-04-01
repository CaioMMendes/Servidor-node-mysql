import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import database from "./database";

dotenv.config();

export const sequelizeInstance = new Sequelize(
  database.database,
  database.user,
  database.password,

  {
    dialect: "mysql",
    host: database.host,
  }
);
export const createDBConnection = async (): Promise<any> => {
  try {
    await sequelizeInstance.authenticate();
    return console.log("deu certo");
  } catch (error) {
    console.log("deu problema", error);
  }
};
