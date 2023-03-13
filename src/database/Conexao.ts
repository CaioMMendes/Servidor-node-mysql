import { Sequelize } from "sequelize";
import dotenv from "dotenv";


dotenv.config();


export const sequelizeInstance = new Sequelize(
  process.env.database as string,
  process.env.user as string,
  process.env.password as string,

  {
    dialect: "mysql",
    host: process.env.host as string,
  }
);
export const createDBConnection = async (): Promise<any> => {


  try {
    await sequelizeInstance.authenticate();
    console.log("deu certo");
  } catch (error) {
    console.log("deu problema", error);
  }

};
