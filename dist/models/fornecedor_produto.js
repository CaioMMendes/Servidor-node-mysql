"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fornecedor_produto = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../database/Conexao");
const fornecedores_1 = require("./fornecedores");
const produtos_1 = require("./produtos");
exports.Fornecedor_produto = Conexao_1.sequelizeInstance.define("fornecedor_produto", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    id_produto: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "produtos",
            key: "id",
        },
    },
    id_fornecedor: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "fornecedores",
            key: "id",
        },
    },
}, {
    tableName: "fornecedor_produto",
    timestamps: false,
});
fornecedores_1.Fornecedores.belongsToMany(produtos_1.Produtos, {
    through: exports.Fornecedor_produto,
    foreignKey: "id_fornecedor",
});
produtos_1.Produtos.belongsToMany(fornecedores_1.Fornecedores, {
    through: exports.Fornecedor_produto,
    foreignKey: "id_produto",
});
//# sourceMappingURL=fornecedor_produto.js.map