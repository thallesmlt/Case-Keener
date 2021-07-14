const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('Keener','root', '89631139', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log("Conexao com o banco estabelecida")
}).catch(function(err){
    console.log("Erro durante a conexão com o banco")
})

module.exports = sequelize;
