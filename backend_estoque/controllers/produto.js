const Produto = require('../models/Produto')

exports.listar = async (req, res) =>{
    await Produto.findAll({
        order: [['id', 'DESC']]
    }).then((produtos) => {
        return res.json({
            erro: false,
            produtos
        })
    }).catch(() => {
        return res.json({
            erro: true,
            message: "Nenhum Produto encontrado!"
        })
    })
}

exports.visualizar = async (req, res) =>{
    await Produto.findByPk(req.params.id).then(produto => {
        return res.json({
            erro: false,
            produto
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            menssagem: "Erro: Produto não encontrado"
        })
    })
}

exports.entrada = async (req, res) =>{
    
    dados = req.body
    
    dados.entrada = parseInt(dados.entrada)
    dados.quantidade = parseInt(dados.quantidade)
    dados.quantidade = dados.quantidade + dados.entrada
    dados.valorTotal = dados.quantidade * dados.valor
  
    await Produto.update(dados, {where: {id: dados.id}}).then(() => {
        return res.json({
            erro: false,
            mensagem: "Entrada de estoque realizada com sucesso"
        })
        
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Entrada de estoque falhou"
        })
    })
}

exports.saida = async (req, res) =>{
    
    dados = req.body
    
    dados.entrada = parseInt(dados.entrada)
    dados.quantidade = parseInt(dados.quantidade)
    dados.quantidade = dados.quantidade - dados.entrada
    if(dados.quantidade < 0) {
        return res.status(500).json({
            erro: true,
            mensagem: "Saida de produtos maior do que o estoque atual!!"
        })
    }
    dados.valorTotal = dados.quantidade * dados.valor
  
    await Produto.update(dados, {where: {id: dados.id}}).then(() => {
        return res.json({
            erro: false,
            mensagem: "Saida do produto realizada com sucesso"
        })
        
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Saida de estoque falhou"
        })
    })
}


exports.cadastrar = async (req, res) =>{

    await Produto.create(req.body).then(() =>{
        return res.json({
            erro: false,
            mensagem: "Produto Registrado com Sucesso"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Não foi possivel cadastrar o produto"
        })
    })
}