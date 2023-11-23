import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import database from "./database";
import * as pg from "pg";

dotenv.config();

export const sequelizeInstance = new Sequelize(database.uri!, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

export const createDBConnection = async (): Promise<any> => {
  try {
    await sequelizeInstance.authenticate();
    return console.log("Conexão com banco de dados bem sucedida");
  } catch (error) {
    console.log("Ocorreu um erro ", error);
  }
};
