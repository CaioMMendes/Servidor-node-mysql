import { CadastroUsuario } from "./models/cadastro";
import { Produtos } from "./models/produtos";
import { Association, Sequelize } from "sequelize";
import express, { Request, Response } from "express";
import { appendFile } from "fs";
import path from "path";
// import mainRoutes from './routes/Index'
import { createDBConnection, sequelizeInstance } from "./database/Conexao";
import { Fornecedor_produto } from "./models/fornecedor_produto";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Fornecedores } from "./models/fornecedores";
import { loginUser } from "./models/login";
import { verifyJWT } from "./middleware/verifyJWT";
import { handleRefreshToken } from "./controllers/refreshTokenController";

const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
dotenv.config();
const app = express();
app.use(cookieParser());
createDBConnection();
app.use(bodyParser.json());

Fornecedor_produto.length; //É só pra inicializar esse arquivo, se quiser fazer sem isso copiar o final belongtomany para o arquivo de Produtos
app.use(cors());
app.use("/", router);
app.get("/users", (req: Request, res: Response) => {
  const users = [
    {
      name: "caio",
      age: 25,
    },
    {
      name: "pedro",
      age: 30,
    },
  ];
  res.status(200).json(users[1]);
});
app.get("/produtos", cors(), async function (req, res, next) {
  let produtos = await Produtos.findAll();
  res.status(200).json(produtos);
});
router.post("/produtos", async function (req, res) {
  const nome = req.body.nome;
  const preco = req.body.preco;
  const estoque = req.body.estoque;
  const minEstoque = req.body.minEstoque;

  const produto = Produtos.create({ nome, preco, estoque, minEstoque });
  res.status(200).json(produto);
});

router.post("/fornecedor", async function (req: Request, res: Response) {
  const nome = req.body.nome;
  const telefone = req.body.telefone;

  const fornecedores = await Fornecedores.create(
    {
      nome: nome,
      telefone: telefone,
      produtos: [
        {
          nome: "cadeiira",
          preco: 20,
          estoque: 3,
          minEstoque: 1,
        },
      ],
    },
    { include: Produtos }
  );
  // const produtos = await Produtos.create({
  //   nome: "cadeiira",
  //   preco: 20,
  //   estoque: 3,
  //   minEstoque: 1,
  // });
  // await produtos.addFornecedores(fornecedores);

  res.status(200).json(fornecedores);
});

router.post("/mata-cadeira", async function (req, res) {
  //  let results:any=await   sequelizeInstance.query(`delete from produtos where nome='cadeira'`)
  let results: any = await Produtos.destroy({
    where: {
      nome: "cadeira",
    },
  });
  res.status(200).json(results);
});
router.post("/cadastrar", async function (req, res) {
  //  let results:any=await   sequelizeInstance.query(`delete from produtos where nome='cadeira'`)

  const nome = req.body.nome;
  const telefone = req.body.telefone;
  const email = req.body.email;
  const sexo = req.body.sexo;
  const localidade = req.body.localidade;
  const cep = req.body.cep;
  const logradouro = req.body.logradouro;
  const uf = req.body.uf;
  const complemento = req.body.complemento;
  const numero = req.body.numero;
  const bairro = req.body.bairro;
  const pais = req.body.pais;

  const validate = await CadastroUsuario.findOne({
    where: {
      email: email,
    },
  });

  console.log(validate);
  if (validate) {
    res.status(418).json(validate);
    return;
  }
  const results = await CadastroUsuario.create({
    nome,
    telefone,
    email,
    sexo,
    localidade,
    cep,
    logradouro,
    uf,
    complemento,
    bairro,
    numero,
    pais,
  });
  res.status(200).json(results);
});
router.post("/register", async function (req, res) {
  //  let results:any=await   sequelizeInstance.query(`delete from produtos where nome='cadeira'`)

  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);
  const name = req.body.name;

  const validate = await loginUser.findOne({
    where: {
      email,
    },
  });

  console.log(validate);
  if (validate) {
    console.log(validate);
    res.status(418).json({ email: validate.email });
    return;
  }
  const results = await loginUser.create({
    email,
    password,
    name,
  });
  res.json(results);
});

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

router.post("/login", async function (req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;
  const validate = await loginUser.findOne({
    where: {
      email,
    },
  });

  if (validate) {
    if (await bcrypt.compare(password, validate.password)) {
      const acessToken = jwt.sign(
        { id: validate.id },
        process.env.ACESS_TOKEN_SECRET,
        { expiresIn: "3000s" }
      );
      const refreshToken = jwt.sign(
        { id: validate.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );
      await loginUser.update({ token: refreshToken }, { where: { email } });
      res.cookie("jwt", refreshToken, {
        httpOnly: true,

        sameSite: "none",

        // secure: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      res.json({
        name: validate.name,
        email: validate.email,
        token: acessToken,
      });

      return;
    } else {
      res.status(418).json(false);
    }
  } else res.status(418).json(false);
});
router.post("/userinfo", verifyJWT, async (req: any, res: Response) => {
  let user: any = await loginUser.findOne({
    where: {
      //esse id sai da criptografia que eu coloquei no jwt ai quando ta certo o token retorna o id
      id: req.id,
    },
  });
  res.json(user);
});
router.post("/refresh", handleRefreshToken);

app.get(
  "/products2",
  cors(),
  async function (req: Request, res: Response, next) {
    let produtos: any[] = await sequelizeInstance.query(
      `select p.* from produtos p ;`
    );
    res.json(produtos);
  }
);
app.get(
  "/products3",
  cors(),
  async function (req: Request, res: Response, next) {
    let produtos: any =
      await sequelizeInstance.query(`select f.nome,p.nome,p.preco,p.estoque,p.minEstoque from fornecedor_produto fp,
 fornecedores f, produtos p where  fp.id_fornecedor=f.id and fp.id_produto=p.id 
 and fp.id_fornecedor `);
    res.status(200).json(produtos);
  }
);
// app.use(express.static(path.join(__dirname,'../public')))
// app.use(mainRoutes)
// app.use((req:Request,res:Response)=>{
//     res.status(404).send('Página não encontrada')
// })
const port = 3003;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

//request dados de cookie, ip essas coisas
//response é a resposta do servidor
