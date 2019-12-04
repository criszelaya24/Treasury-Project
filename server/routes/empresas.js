const express = require('express');
const router = express.Router();
const { isUserSignIn } = require('../helpers/validators/users')
const { validate } = require('../helpers/validateResults')
const empresasController = require('../controller/empresas')
const { empresaSearchRules, empresasValidationRules } = require('../helpers/validators/empresas')

router.get('/', isUserSignIn, empresasController.listEmpresas)
router.get('/:id', isUserSignIn, empresaSearchRules(), validate, empresasController.listSpecificEmpresa)
router.delete('/:id', isUserSignIn, empresaSearchRules(), validate, empresasController.deleteSpecificEmpresa)
router.post('/', isUserSignIn, empresasValidationRules(), validate, empresasController.createEmpresa)
module.exports = router