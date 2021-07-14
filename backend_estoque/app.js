const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const app = express()

dotenv.config({path: './.env'})


app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET ,PUT, POST, DELETE, PATCH")
    res.header("Access-Control-Allow-Headers", "Content-Type, X-PINGOTHER, Authorization, x-access-token")
    app.use(cors())
    next()
})

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
//app.set('view engine', 'hbs');

app.use('/produtos', require('./routes/produto'))
app.use('/', require('./routes/auth'))
app.use('/log', require('./routes/entrada'))


app.listen(8080, function(){
    console.log("Servidor iniciado na porta 8080")
})