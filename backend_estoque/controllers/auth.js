
const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE 
})


exports.register = (req,res) => {
    
    const {email, senha, confirmarSenha} = req.body
    
    db.query('SELECT email FROM usuarios WHERE email = ?',[email] , async (error, results) => {
    
        if(results.length > 0){
            return res.status(400).json( {
                erro: true,
                mensagem: "Erro: Email já encontra-se em uso"
            })
        } else if(senha !== confirmarSenha){
            return res.status(400).json( {
                erro: true,
                mensagem: "Erro: As senhas não coincidem"
            })
        }
        let hashedPassword = await bcrypt.hash(senha, 8) //encriptar pode levar algum tempo - assincrono
        
        db.query('INSERT INTO usuarios SET ? ', {email, senha: hashedPassword }, (error, results) => {
            if(error) {
                return res.status(400).json( {
                    erro: true,
                    mensagem: error
                })
            } else{
                
                return res.status(400).json( {
                    erro: false,
                    mensagem: "Registrado com sucesso!"
                })
            }
        })
    })
}

exports.login = async (req, res) => {
    try{
        const {email,senha} = req.body
        
        if(!email || !senha){
            return res.status(400).json( {
                erro: true,
                mensagem: "Erro: Email e/ou senha não preenchidos"
            })
        }

        db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results) => {
            
            if(!results || !(await bcrypt.compare(senha, results[0].senha))){
                return res.status(401).json( {
                    erro: true,
                    mensagem: "Erro: Email ou senha incorretos"
                })
            } else{
                const id = results[0].id
                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })
                
                res.status(200).json({auth: true, token: token, results: results, email})
                //res.status(200).redirect("/")
            }
        })

    } catch(error){
    }
}

exports.autorizado = async (req, res) => {
    res.send("voce esta autorizado")
}

/*const verifyJWT = (req, res, next) =>{
    const token = req.headers["x-access-token"]

    if(!token){
        res.send("Voce precisa ter feito o Login para acessar essa pagina")
    }
    else{
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
            if(err) {
                res.json({auth: false, message: "Autenticação falhou!!"})
            } else{
                req.userId = decoded.id
                next()
            }
        })
    }
}*/

