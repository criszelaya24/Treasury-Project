const express = require('express');
const router = express.Router();
const proveedoresController = require('../controller/proveedores')
const { proveedoresValidationRules } = require('../helpers/validators/proveedores')
const { validate } = require('../helpers/validateResults')

router.get('/', proveedoresController.listProveedores)
router.post('/', proveedoresValidationRules(), validate, proveedoresController.createProveedores)

  module.exports = router