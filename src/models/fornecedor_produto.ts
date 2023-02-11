import { timeStamp } from "console";
import sequelize from "sequelize";
import { Model, DataTypes } from "sequelize";

import { PassThrough } from "stream";
import { sequelizeInstance } from "../database/Conexao";
import { Fornecedores } from "./fornecedores";
import { Produtos } from "./produtos";

export interface Fornecedor_produtoInstance extends Model {
  id: number;
  id_produto: number;
  id_fornecedor: number;
}

export const Fornecedor_produto =
  sequelizeInstance.define<Fornecedor_produtoInstance>(
    "fornecedor_produto",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },

      id_produto: {
        type: DataTypes.INTEGER,
        references: {
          model: "produtos",
          key: "id",
        },
      },
      id_fornecedor: {
        type: DataTypes.INTEGER,
        references: {
          model: "fornecedores",
          key: "id",
        },
      },
    },
    {
      tableName: "fornecedor_produto",
      timestamps: false,
    }
  );

Fornecedores.belongsToMany(Produtos, {
  through: Fornecedor_produto,
  foreignKey: "id_fornecedor",
});
Produtos.belongsToMany(Fornecedores, {
  through: Fornecedor_produto,
  foreignKey: "id_produto",
});
