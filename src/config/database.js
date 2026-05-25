 const Database = require('better-sqlite3')// importando a biblioteca do sqlite
 const path = require('path')//importando o modulo path do node.js para trabalhar com caminhos de arquivos
 const db = new Database(path.join(__dirname, '../../database.db'))//criado uma instancia do banco de dados

 

 //CRIANDO A TABELA DE USUÁRIOS E A TABELA DE TAREFAS COM SUAS RESPECTIVAS COLUNAS
 db.exec(`
    CREATE TABLE IF NOT EXISTS Users(
    
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL 
    
    );

    CREATE TABLE IF NOT EXISTS Tasks(
    
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
    );
    `)

    module.exports = db;