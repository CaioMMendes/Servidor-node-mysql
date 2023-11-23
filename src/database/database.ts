import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let database = { uri: process.env.URI_DATABASE };

// if (process.env.NODE_ENV === "test") {
// database = {

// database: process.env.TEST_DATABASE as any,
// user: process.env.TEST_USER as string,
// password: process.env.TEST_PASSWORD as string,
// host: process.env.TEST_HOST as string,
// };

//   console.log("ambiente de testes");
// } else {
//   database = {
//     uri: process.env.URI_DATABASE,
//   };
// }

export default database;
