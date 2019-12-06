const { body, check } = require('express-validator')

const currenciesSearchRules = () => {
    return [
      check('id').isNumeric()
    ]
  }

const currenciesValidationRules = () => {
    return [
        body('name').not().isEmpty().withMessage('Name must me fill').isLength({min: 5}).withMessage('Lenght of name needs to be up of 5'),
        body('symbol').not().isEmpty().withMessage('symbol must me fill').isLength({min: 1}).withMessage('Lenght of symbol needs to be up of 1')
      ]
}

module.exports = {
    currenciesSearchRules,
    currenciesValidationRules
}