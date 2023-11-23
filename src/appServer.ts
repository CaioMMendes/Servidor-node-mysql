// import { Produtos } from "./models/produtos";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { corsOptions } from "./config/corsOptions";
import { createDBConnection } from "./database/Conexao";
import { credentials } from "./middleware/credentials";
// import { Fornecedor_produto } from "./models/fornecedor_produto";
import apiLogin from "./routes/apiLogin";
import endereco from "./routes/endereco";

const cookieParser = require("cookie-parser");
const cors = require("cors");

const router = express.Router();
dotenv.config();
const app = express();
app.use(credentials);
app.use(cookieParser());
createDBConnection();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

// Fornecedor_produto.length; //É só pra inicializar esse arquivo, se quiser fazer sem isso copiar o final belongtomany para o arquivo de Produtos
app.use(cors(corsOptions));
app.use("/", router);
app.use(apiLogin);
// app.use(produtos);
app.use(endereco);
// app.use(fornecedor);
// const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
//   res.status(400);
//   if (err instanceof MulterError) {
//     res.json({ error: err.code });
//   } else {
//     console.log(err);
//     res.json({ error: "Ocorreu algum erro" });
//   }
// };
// app.use(errorHandler);
// router.post("/mata-cadeira", async function (req, res) {
//   //  let results:any=await   sequelizeInstance.query(`delete from produtos where nome='cadeira'`)
//   let results: any = await Produtos.destroy({
//     where: {
//       nome: "cadeira",
//     },
//   });
//   res.status(200).json(results);
// });
export default app;

//request dados de cookie, ip essas coisas
//response é a resposta do servidor
