const { body, param } = require('express-validator')
const proveedoresValidationRules = () => {
  return [
    body('name').not().isEmpty().withMessage('Name must me fill').isLength({min: 5}).withMessage('Lenght of name needs to be up of 5')
  ]
}

const proveedoresSearchRules = () => {
  return [
    param('id').not().isEmpty().withMessage('id must be pass')
  ]
}

module.exports = {
  proveedoresValidationRules,
  proveedoresSearchRules
}