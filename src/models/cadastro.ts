import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "../database/Conexao";

export interface CadastroUsuarioInstance extends Model {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  sexo: string;
  cep: string;
  rua: string;
  uf: string;
  cidade: string;
  pais: string;
  bairro: string;
  numero: string;
  complemento: string;
}

export const CadastroUsuario =
  sequelizeInstance.define<CadastroUsuarioInstance>(
    "cadastroUsuario",
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sexo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logradouro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      localidade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pais: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bairro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      complemento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "cadastro_usuario",
      timestamps: false,
    }
  );
