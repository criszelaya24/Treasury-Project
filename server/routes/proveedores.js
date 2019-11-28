const express = require('express');
const router = express.Router();
const proveedoresController = require('../controller/proveedores')

router.get('/', proveedoresController.getProveedores)

  module.exports = router