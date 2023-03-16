"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDBConnection = exports.sequelizeInstance = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelizeInstance = new sequelize_1.Sequelize(process.env.database, process.env.user, process.env.password, {
    dialect: "mysql",
    host: process.env.host,
});
const createDBConnection = async () => {
    try {
        await exports.sequelizeInstance.authenticate();
        console.log("deu certo");
    }
    catch (error) {
        console.log("deu problema", error);
    }
};
exports.createDBConnection = createDBConnection;
//# sourceMappingURL=Conexao.js.map