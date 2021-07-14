const Entrada = require('../models/entrada')

exports.listar = async (req, res) =>{
    await Entrada.findAll({
        order: [['id', 'DESC']]
    }).then((entradas) => {
        return res.json({
            erro: false,
            entradas
        })
    }).catch(() => {
        return res.json({
            erro: true,
            message: "Nenhuma Entrada encontrada!"
        })
    })
}

exports.inserir = async (req, res) =>{
    dados = req.body
    
    await Entrada.create(dados).then(() =>{
        return res.json({
            erro: false,
            mensagem: ""
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Entradas não inserida no Log de Entradas"
        })
    })
}
