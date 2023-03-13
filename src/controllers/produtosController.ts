
import { createDBConnection, sequelizeInstance } from "../database/Conexao";
import { Request, Response } from "express";
import { Produtos } from "../models/produtos";
export const products2=  async function (req: Request, res: Response, next:any) {
    let produtos: any[] = await sequelizeInstance.query(
      `select p.* from produtos p ;`
    );
    res.json(produtos);
  }


 export const products3= async function (req: Request, res: Response, next:any) {
    let produtos: any =
      await sequelizeInstance.query(`select f.nome,p.nome,p.preco,p.estoque,p.minEstoque from fornecedor_produto fp,
 fornecedores f, produtos p where  fp.id_fornecedor=f.id and fp.id_produto=p.id 
 and fp.id_fornecedor `);
    res.status(200).json(produtos);
  }



export const produtosGet= async function (req:Request, res:Response, next:any) {
    let produtos = await Produtos.findAll();
    res.status(200).json(produtos);
  }
export const produtosPost = async function (req: Request, res: Response, next: any) {
  const nome = req.body.nome;
  const preco = req.body.preco;
  const estoque = req.body.estoque;
  const minEstoque = req.body.minEstoque;

  const produto = Produtos.create({ nome, preco, estoque, minEstoque });
  res.status(200).json(produto);
};