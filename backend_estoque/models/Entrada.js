const Sequelize = require('sequelize')
const db = require('./db')


const Entrada = db.define('entrada',{ 
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    produto:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    data:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    quantidadeAlterada:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipo:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Entrada.sync()
module.exports = Entrada