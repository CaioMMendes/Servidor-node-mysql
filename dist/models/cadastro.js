"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastroUsuario = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../database/Conexao");
exports.CadastroUsuario = Conexao_1.sequelizeInstance.define("cadastroUsuario", {
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
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    telefone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sexo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    logradouro: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    uf: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    localidade: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    pais: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bairro: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    numero: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    complemento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "cadastro_usuario",
    timestamps: false,
});
//# sourceMappingURL=cadastro.js.map