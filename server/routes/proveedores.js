const express = require('express');
const router = express.Router();
const proveedoresController = require('../controller/proveedores')
const { proveedoresValidationRules, validate } = require('../helpers/validators/proveedores')

router.get('/', proveedoresController.listProveedores)
router.post('/', proveedoresValidationRules(), validate, proveedoresController.createProveedores)

  module.exports = router