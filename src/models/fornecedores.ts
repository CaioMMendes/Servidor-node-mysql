import { timeStamp } from "console";
import sequelize from "sequelize";
import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../database/Conexao";

export interface FornecedorInstance extends Model {
  id: number;
  nome: string;
  telefone: string;
}

export const Fornecedores = sequelizeInstance.define<FornecedorInstance>(
  "fornecedores",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "fornecedores",
    timestamps: false,
  }
);
