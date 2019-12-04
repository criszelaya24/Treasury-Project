const express = require('express');
const router = express.Router();
const { isUserSignIn } = require('../helpers/validators/users')
const { validate } = require('../helpers/validateResults')
const currenciesController = require('../controller/currencies')

router.get('/', isUserSignIn, currenciesController.getAllCurrencies)

module.exports = router