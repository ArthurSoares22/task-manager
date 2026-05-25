const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.auth = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(401).json({message: "Token não fornecido"})

   try {
     const extractToken = authHeader.split(" ")
    req.user = jwt.verify(extractToken[1], process.env.JWT_SECRET)
   } catch (error) {
        return res.status(401).json({message: "token invalido"})
    } 
    
next();
}
