const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(!token){
        res.send("Voce precisa ter feito o Login para acessar essa pagina")
    }
    else{
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
            if(err) {
                res.json({auth: false, menssagem: "Autenticação falhou!!"})
            } else{
                req.userId = decoded.id
                next()
            }
        })
    }
}

module.exports = verifyJWT



