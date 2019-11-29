const express = require('express');
const router = express.Router();
const tokenController = require('../controller/token')
const { logInValidationRules } = require('../helpers/validators/users')
const { validate } = require('../helpers/validateResults')
router.post('/', logInValidationRules(), validate, tokenController.createToken)

module.exports = router