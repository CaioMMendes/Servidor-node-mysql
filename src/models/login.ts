import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../database/Conexao";

export interface loginUserInstance extends Model {
  id: number;
  username: string;
  password: string;
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "login",
    timestamps: false,
  }
);
