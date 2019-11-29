const express = require('express');
const router = express.Router();
const proveedoresController = require('../controller/proveedores')
const { proveedoresValidationRules, proveedoresSearchRules } = require('../helpers/validators/proveedores')
const { isUserSignIn } = require('../helpers/validators/users')
const { validate } = require('../helpers/validateResults')

router.get('/', isUserSignIn, proveedoresController.listProveedores)
router.post('/', isUserSignIn, proveedoresValidationRules(), validate, proveedoresController.createProveedores)
router.get('/:id',proveedoresSearchRules(), validate, proveedoresController.findProveedores)

  module.exports = router