const Sequelize = require('sequelize')
const db = require('./db')

const Produto = db.define('produtos',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    valor:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }, 
    valorTotal:{
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    quantidade:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Produto.sync()
module.exports = Produto