const db = require('../config/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.register = (req, res) => {
    const {email, password} = req.body;
    
    if (!password || !email) {
      return  res.status(400).json({message: 'email e senha são obrigatórios'})
    }

const findUser = db.prepare('SELECT * FROM users WHERE email = ?')
const user = findUser.get(email)
if(user){
    return res.status(409).json({message:'email ja cadastro'})
}
const hash = bcrypt.hashSync(password,10)

 const insertUser  = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)')
 insertUser.run(email, hash)

 return res.status(201).json({message: 'usuário criado com sucesso'})
}

//FEATURE DE CONFIRMAÇÃO DE LOGIN
exports.login = (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
         return  res.status(400).json({message: 'email e senha são obrigatórios'})
    }

const findUser = db.prepare('SELECT * FROM users WHERE email = ?')
const user = findUser.get(email)

if(!user){
    return res.status(401).json({message: 'credenciais invalidas'})
    }

const senhaCorreta = bcrypt.compareSync(password, user.password_hash)
if(!senhaCorreta){
    return res.status(401).json({message: 'credenciais invalidas'})
}
    
const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'})
return res.status(200).json({token: token})
}

