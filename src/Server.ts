import express,{ Request, Response} from 'express'
import { appendFile } from 'fs'
import path from 'path'
import mainRoutes from './routes/Index'

const app=express()

app.get('/',(req:Request,res:Response)=>{
    res.status(200).send('<h1> hello world</h1>')
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

// app.use(express.static(path.join(__dirname,'../public')))
// app.use(mainRoutes)
// app.use((req:Request,res:Response)=>{
//     res.status(404).send('Página não encontrada')
// })
const port=3003
app.listen(port, ()=>{console.log(`Servidor rodando na porta ${port}`)})

//request dados de cookie, ip essas coisas
//response é a resposta do servidor