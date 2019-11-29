const express = require('express');
const router = express.Router();
const proveedoresController = require('../controller/proveedores')
const { proveedoresValidationRules } = require('../helpers/validators/proveedores')
const { isUserSignIn } = require('../helpers/validators/users')
const { validate } = require('../helpers/validateResults')

router.get('/', isUserSignIn, proveedoresController.listProveedores)
router.post('/', isUserSignIn, proveedoresValidationRules(), validate, proveedoresController.createProveedores)

  module.exports = router