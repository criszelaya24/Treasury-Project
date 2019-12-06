const { body, check } = require('express-validator')

const statusFacturaValidationRules = () => {
    return [
      body('name').not().isEmpty().withMessage('Name must me fill').isLength({min: 5}).withMessage('Lenght of name needs to be up of 5')
    ]
  }
  
  const statusFacturaSearchRules = () => {
    return [
      check('id').isNumeric()
    ]
  }

  module.exports = {
      statusFacturaSearchRules,
      statusFacturaValidationRules
  }