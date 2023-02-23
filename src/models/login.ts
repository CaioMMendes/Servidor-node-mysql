import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../database/Conexao";

export interface loginUserInstance extends Model {
  id: number;
  email: string;
  password: string;
  name: string;
}

export const loginUser = sequelizeInstance.define<loginUserInstance>(
  "loginUser",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "login",
    timestamps: false,
  }
);
