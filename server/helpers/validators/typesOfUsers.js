const { body, check } = require('express-validator')

const typeOfUsersValidationRules = () => {
    return [
      body('name').not().isEmpty().withMessage('Name must me fill').isLength({min: 5}).withMessage('Lenght of name needs to be up of 5')
    ]
  }

const typeOfUserSearchRules = () => {
  return [
    check('id').isNumeric()
  ]
}
module.exports = {
    typeOfUsersValidationRules,
    typeOfUserSearchRules
}