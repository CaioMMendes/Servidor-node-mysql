import  {Sequelize}  from 'sequelize';
import express,{ Request, Response} from 'express'
import { appendFile } from 'fs'
import path from 'path'
const cors = require('cors')
// import mainRoutes from './routes/Index'
import {createDBConnection, sequelizeInstance} from './database/Conexao'
import {Produtos} from './models/Produtos'

import dotenv from 'dotenv'



dotenv.config()
const app=express()
createDBConnection()
app.use(cors());
console.log(process.env.user)
app.get('/',(req:Request,res:Response)=>{
    res.status(200).send('<h1>hello world</h1>')
})



app.get('/users',(req:Request,res:Response)=>{
   const users=[
     {
        name:'caio',
        age: 25
    },
     {
        name:'pedro',
        age: 30
    },
]
res.status(200).json(users[1])
})
app.get('/produtos',cors(), async function  (req, res, next) {
 let produtos=await Produtos.findAll();
 res.status(200).json(produtos)
})


app.get('/products2',cors(), async function  (req:Request, res:Response, next) {
 let produtos:any=await sequelizeInstance.query(`select * from produtos `
      );
 res.status(200).json(produtos)
})
app.get('/products3',cors(), async function  (req:Request, res:Response, next) {
 let produtos:any=await sequelizeInstance.query(`select f.nome,p.nome,p.preco,p.estoque,p.minEstoque from fornecedor_produto fp,
 fornecedores f, produtos p where  fp.id_fornecedor=f.id and fp.id_produto=p.id 
 and fp.id_fornecedor `
 
      );
 res.status(200).json(produtos)
})
// app.use(express.static(path.join(__dirname,'../public')))
// app.use(mainRoutes)
// app.use((req:Request,res:Response)=>{
//     res.status(404).send('Página não encontrada')
// })
const port=3003
app.listen(port, ()=>{console.log(`Servidor rodando na porta ${port}`)})

//request dados de cookie, ip essas coisas
//response é a resposta do servidor