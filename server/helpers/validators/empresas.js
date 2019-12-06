const { body, check } = require('express-validator')

const empresaSearchRules = () => {
    return [
      check('id').isNumeric()
    ]
  }

const empresasValidationRules = () => {
    return [
      body('nombre').not().isEmpty().withMessage('nombre must me fill').isLength({min: 5}).withMessage('Lenght of nombre needs to be up of 5')
    ]
}

module.exports = {
    empresaSearchRules,
    empresasValidationRules
}