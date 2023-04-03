import { timeStamp } from "console";
import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../database/Conexao";

export interface loginUserInstance extends Model {
  id: number;
  email: string;
  password: string;
  name: string;
  token: string;
  googleId: string;
  avatarId: string;
  picture: string;
  expire: Date;
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
    token: {
      type: DataTypes.STRING,
      unique: true,
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
    },
    avatarId: {
      type: DataTypes.STRING,
      unique: true,
    },
    picture: {
      type: DataTypes.STRING,
    },
    expire: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "login",
    timestamps: false,
  }
);
