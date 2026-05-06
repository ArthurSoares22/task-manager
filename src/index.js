const Database = require('better-sqlite3')

const express = require('express') // aqui estamos criando um função express
const app = express()// usando a variavel app que executa as funcionalidades do express

const authRoutes = require('./routes/authRoutes')
app.use(express.json())// convertendo arquivos json em objetos javascript
app.use('/auth', authRoutes)

require('./config/database')


app.get('/',(req,res) => {
    res.json ({message: 'Servidor Funcionando'})
})//enviando uma mensagem de que o servidor está funcionando

const PORT = process.env.PORT || 3000
app.listen (PORT, () =>{
    console.log(`servidor rodando na porta ${PORT}`)
})//escutando na porta 3000 e verificando se o servidor está funcionando