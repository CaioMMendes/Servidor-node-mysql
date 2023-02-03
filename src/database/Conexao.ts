import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config()


export const createDBConnection = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});
    connection.connect((err) => {
      if (err) {
        reject(err);
        console.error('error connecting: ' + err.stack);
      } else {
        resolve(connection);
        console.log('connected as id ' + connection.threadId);      }
    });
  });
};
    
  

