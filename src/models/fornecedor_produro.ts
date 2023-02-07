import { timeStamp } from "console";
import sequelize from "sequelize";
import { Model, DataTypes } from "sequelize";
import {sequelizeInstance} from '../database/Conexao'


export interface Fornecedor_produtoInstance extends Model{
    id:number;
    id_fornecedor:number;
    id_produto:number;

}


export const Fornecedores_produto = sequelizeInstance.define<Fornecedor_produtoInstance>('fornecedores_produto',{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true
        
    },
    nome:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    telefone:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
        tableName:'produtos',
        timestamps:false,
        
    })