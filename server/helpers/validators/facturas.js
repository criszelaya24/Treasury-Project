const { check } = require('express-validator')

const facturaSearchRules = () => {
    return [
      check('id').isNumeric()
    ]
  }

module.exports = {
    facturaSearchRules
}