import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config()


// export const createDBConnection = (): Promise<any> => {
//   return new Promise((resolve, reject) => {
//     const connection = mysql.createConnection({
//   host: process.env.host,
//   user: process.env.user,
//   password: process.env.password,
//   database: process.env.database
// });
//     connection.connect((err) => {
//       if (err) {
//         reject(err);
//         console.error('error connecting: ' + err.stack);
//       } else {
//         resolve(connection);
//         console.log('connected as id ' + connection.threadId);      }
//     });
//   });
// };
    
     export const sequelizeInstance = new Sequelize(
      process.env.database as string,
  process.env.user as string,
 process.env.password as string,

  {
    dialect:'mysql',
      host: process.env.host as string,

  }
)
export const createDBConnection = async (): Promise<any> =>  {


// console.log(process.env.user)
// console.log(process.env.password)
// console.log(process.env.database)
// console.log(process.env.host)



try{
    await sequelizeInstance.authenticate()
     console.log('deu certo')

}catch(error){
    console.log("deu problema",error)
}
    //   sequelize.authenticate((err:Error) =>  {
    //   if (err) {
    //     reject(err);
    //       console.error('error connecting: ' ,err);
    //   } else {
        
    //     console.log('connected as id ' );      }
    // });
  ;
};
    

