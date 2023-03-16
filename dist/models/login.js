"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const sequelize_1 = require("sequelize");
const Conexao_1 = require("../database/Conexao");
exports.loginUser = Conexao_1.sequelizeInstance.define("loginUser", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
}, {
    tableName: "login",
    timestamps: false,
});
//# sourceMappingURL=login.js.map