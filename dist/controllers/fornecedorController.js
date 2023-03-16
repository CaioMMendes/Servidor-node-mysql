"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fornecedor = void 0;
const fornecedores_1 = require("../models/fornecedores");
const produtos_1 = require("../models/produtos");
const fornecedor = async function (req, res) {
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const fornecedores = await fornecedores_1.Fornecedores.create({
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
    }, { include: produtos_1.Produtos });
    res.status(200).json(fornecedores);
};
exports.fornecedor = fornecedor;
//# sourceMappingURL=fornecedorController.js.map