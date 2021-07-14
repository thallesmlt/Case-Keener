const express = require('express')
const produtoController = require('../controllers/produto')
const router = express.Router()
const verifyJWT = require('../middleware/validateJwt')

router.get('/listar', verifyJWT, produtoController.listar)
router.post('/cadastrar', verifyJWT, produtoController.cadastrar)
router.get('/visualizar/:id',produtoController.visualizar)
router.put('/entrada', verifyJWT, produtoController.entrada)
router.put('/saida', verifyJWT, produtoController.saida)

module.exports = router