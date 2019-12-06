const express = require('express');
const router = express.Router();
const { isUserSignIn } = require('../helpers/validators/users')
const facturaController = require('../controller/facturas')
const { validate } = require('../helpers/validateResults')
const { facturaSearchRules, facturaValidationRules } = require('../helpers/validators/facturas')

router.get('/', isUserSignIn, facturaController.listFacturas)
router.post('/', isUserSignIn, facturaValidationRules(), validate, facturaController.createNewFactura)
router.get('/:id', isUserSignIn, facturaSearchRules(), validate, facturaController.listSpecificFactura)
router.delete('/:id', isUserSignIn, facturaSearchRules(), validate, facturaController.deleteSpecificFactura)
module.exports = router