"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produtos = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../database/Conexao");
exports.Produtos = Conexao_1.sequelizeInstance.define("produtos", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    estoque: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    minEstoque: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: "produtos",
    timestamps: false,
});
//# sourceMappingURL=produtos.js.map