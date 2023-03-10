import { Produtos } from "./models/produtos";
import express, { Request, Response } from "express";
import { createDBConnection } from "./database/Conexao";
import { Fornecedor_produto } from "./models/fornecedor_produto";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { corsOptions } from "./config/corsOptions";
import { credentials } from "./middleware/credentials";
import apiLogin from "./routes/apiLogin";
import endereco from "./routes/endereco";
import produtos from "./routes/apiProdutos";
import fornecedor from "./routes/fornecedor";
const cookieParser = require("cookie-parser");
const cors = require("cors");

const router = express.Router();
dotenv.config();
const app = express();
app.use(credentials);
app.use(cookieParser());
createDBConnection();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
Fornecedor_produto.length; //É só pra inicializar esse arquivo, se quiser fazer sem isso copiar o final belongtomany para o arquivo de Produtos
app.use(cors(corsOptions));
app.use("/", router);
app.use(apiLogin);
app.use(produtos);
app.use(endereco);
app.use(fornecedor);

router.post("/mata-cadeira", async function (req, res) {
  //  let results:any=await   sequelizeInstance.query(`delete from produtos where nome='cadeira'`)
  let results: any = await Produtos.destroy({
    where: {
      nome: "cadeira",
    },
  });
  res.status(200).json(results);
});

const port = 3003;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

//request dados de cookie, ip essas coisas
//response é a resposta do servidor
