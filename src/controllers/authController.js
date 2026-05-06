const db = require('../config/database')
const bcrypt = require('bcrypt')


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