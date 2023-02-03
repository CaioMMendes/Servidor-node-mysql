import { timeStamp } from "console";
import sequelize from "sequelize";
import { Model, DataTypes } from "sequelize";
import {sequelizeInstance} from '../database/Conexao'


export interface ProductInstance extends Model{
    id:number;
    nome:string;
    preço:number;
    estoque:number;
    minEstoue:number;
}


export const Product = sequelizeInstance.define<ProductInstance>('products',{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER
        
    },
    nome:{
        type:DataTypes.STRING
    },
    preco:{
        type:DataTypes.FLOAT
    },
    estoque:{
        type:DataTypes.INTEGER
    },
    minEstoque:{
        type:DataTypes.INTEGER
    }
})