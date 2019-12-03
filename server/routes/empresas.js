const express = require('express');
const router = express.Router();
const { isUserSignIn } = require('../helpers/validators/users')
const empresasController = require('../controller/empresas')

router.get('/', isUserSignIn, empresasController.listEmpresas)
module.exports = router