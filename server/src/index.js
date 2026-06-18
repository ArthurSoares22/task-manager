//importsx
require('dotenv').config()
const express = require('express') // aqui estamos criando um função express
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
require('./config/database')

//app
const app = express()// usando a variavel app que executa as funcionalidades do express
app.use(cors())
app.use(express.json())// convertendo arquivos json em objetos javascript(precisa vir sempre antes de qualquer rota)

//rotas
app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)
app.get('/',(req,res) => {
    res.json ({message: 'Servidor Funcionando'})//enviando uma mensagem de que o servidor está funcionando
})

//servidor
const PORT = process.env.PORT || 3000
app.listen (PORT, () =>{
    console.log(`servidor rodando na porta ${PORT}`)//escutando na porta 3000 e verificando se o servidor está funcionando
})

// import {express} from 'express'
// const server = express()

