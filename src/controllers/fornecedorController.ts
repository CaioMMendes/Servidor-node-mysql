



import  { Request, Response } from "express";

import { Fornecedores } from "../models/fornecedores";

import { Produtos } from "../models/produtos";









export const fornecedor= async function (req: Request, res: Response) {
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
}