const express = require('express');
const router = express.Router();
const { isUserSignIn } = require('../helpers/validators/users')
const { validate } = require('../helpers/validateResults')
const { currenciesValidationRules } = require('../helpers/validators/currencies')
const currenciesController = require('../controller/currencies')

router.get('/', isUserSignIn, currenciesController.getAllCurrencies)
router.post('/', isUserSignIn, currenciesValidationRules(), validate, currenciesController.createNewCurrency)

module.exports = router