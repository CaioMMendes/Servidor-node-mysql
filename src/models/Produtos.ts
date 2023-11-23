import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "../database/Conexao";
import { FornecedorInstance } from "./fornecedores";

export interface ProdutosInstance extends Model {
  addFornecedores(fornecedores: FornecedorInstance): any;
  id: number;
  nome: string;
  preço: number;
  estoque: number;
  minEstoue: number;
}

export const Produtos = sequelizeInstance.define<ProdutosInstance>(
  "produtos",
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
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    minEstoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "produtos",
    timestamps: false,
  }
);
