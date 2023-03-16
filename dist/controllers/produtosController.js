"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.produtosPost = exports.produtosGet = exports.products3 = exports.products2 = void 0;
const Conexao_1 = require("../database/Conexao");
const produtos_1 = require("../models/produtos");
const products2 = async function (req, res, next) {
    let produtos = await Conexao_1.sequelizeInstance.query(`select p.* from produtos p ;`);
    res.json(produtos);
};
exports.products2 = products2;
const products3 = async function (req, res, next) {
    let produtos = await Conexao_1.sequelizeInstance.query(`select f.nome,p.nome,p.preco,p.estoque,p.minEstoque from fornecedor_produto fp,
 fornecedores f, produtos p where  fp.id_fornecedor=f.id and fp.id_produto=p.id 
 and fp.id_fornecedor `);
    res.status(200).json(produtos);
};
exports.products3 = products3;
const produtosGet = async function (req, res, next) {
    let produtos = await produtos_1.Produtos.findAll();
    res.status(200).json(produtos);
};
exports.produtosGet = produtosGet;
const produtosPost = async function (req, res, next) {
    const nome = req.body.nome;
    const preco = req.body.preco;
    const estoque = req.body.estoque;
    const minEstoque = req.body.minEstoque;
    const produto = produtos_1.Produtos.create({ nome, preco, estoque, minEstoque });
    res.status(200).json(produto);
};
exports.produtosPost = produtosPost;
//# sourceMappingURL=produtosController.js.map