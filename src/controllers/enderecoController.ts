import { Request, Response } from "express";

import { CadastroUsuario } from "../models/cadastro";
// import bodyParser from "body-parser";
// const app = express();
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );


export const cadastrar= async function (req:Request, res:Response) {
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
}

