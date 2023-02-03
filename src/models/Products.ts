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


export const Products = sequelizeInstance.define<ProductInstance>('products',{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        allowNull:false
        
    },
    nome:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    preco:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    estoque:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    minEstoque:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    }
},{
        tableName:'produtos',
        timestamps:false,
        
    })