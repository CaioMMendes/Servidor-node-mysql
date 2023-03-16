"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fornecedores = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../database/Conexao");
exports.Fornecedores = Conexao_1.sequelizeInstance.define("fornecedores", {
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
    telefone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "fornecedores",
    timestamps: false,
});
//# sourceMappingURL=fornecedores.js.map