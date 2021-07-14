const express = require('express')
const authController = require('../controllers/auth')
const router = express.Router()
const verifyJWT = require('../middleware/validateJwt')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/autenticado', verifyJWT, authController.autorizado)

module.exports = router
