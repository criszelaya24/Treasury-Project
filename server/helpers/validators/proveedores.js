const { body } = require('express-validator')
const proveedoresValidationRules = () => {
  return [
    body('name').not().isEmpty().withMessage('Name must me fill').isLength({min: 5}).withMessage('Lenght of name needs to be up of 5')
  ]
}


module.exports = {
  proveedoresValidationRules,
}