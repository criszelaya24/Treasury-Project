const express = require('express')
const router = express.Router();
const { isUserSignIn } = require('../helpers/validators/users')
const { statusFacturaSearchRules, statusFacturaValidationRules } = require('../helpers/validators/statusFactura')
const { validate } = require('../helpers/validateResults')
const statusFacturaController = require('../controller/statusFactura')
router.post('/', isUserSignIn, statusFacturaValidationRules(), validate, statusFacturaController.createNewStatusFactura )
router.get('/', isUserSignIn, statusFacturaController.getAllStatusFactura)
router.get('/:id', isUserSignIn, statusFacturaSearchRules(), validate, statusFacturaController.listStatusFactura )
router.delete('/:id', isUserSignIn, statusFacturaSearchRules(), validate, statusFacturaController.deleteStatusFactura )
module.exports = router