import express,{ Request, Response} from 'express'
import { appendFile } from 'fs'
import path from 'path'
const cors = require('cors')
// import mainRoutes from './routes/Index'
import {createDBConnection} from './database/Conexao'
import {Products} from './models/Products'

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
app.get('/products',cors(), async function  (req, res, next) {
 let products=await Products.findAll();
 res.status(200).json(products)
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