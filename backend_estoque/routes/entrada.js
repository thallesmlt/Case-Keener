const express = require('express')
const entradaController = require('../controllers/entrada')
const router = express.Router()
const verifyJWT = require('../middleware/validateJwt')

router.get('/listar', verifyJWT, entradaController.listar)
router.post('/entrada',verifyJWT, entradaController.inserir)

module.exports = router
