const {body, check } = require('express-validator')

const facturaSearchRules = () => {
    return [
      check('id').isNumeric()
    ]
}

const facturaValidationRules = () => {
  return [
    body('numero').not().isEmpty().withMessage('Numero from factura must be fill').isNumeric().withMessage('Numero from factura must be integer'),
    body('proveedor').not().isEmpty().withMessage('Proveedor ID must be fill').isNumeric().withMessage('Proveedor ID must be integer'),
    body('currency').not().isEmpty().withMessage('Currency ID must be fill').isNumeric().withMessage('Currency ID must be integer'),
    body('monto').not().isEmpty().withMessage('Monto must be fill').isNumeric().withMessage('Monto must be integer'),
    body('fecha').not().isEmpty().withMessage('Fecha must be fill').isISO8601('yyyy-mm-dd hh:mm:ss').withMessage('Fecha must be in correct format yyy-mm-dd hh:mm:ss'),
    body('vencimiento').not().isEmpty().withMessage('Vencimiento must be fill').isISO8601('yyyy-mm-dd hh:mm:ss').withMessage('Vencimiento must be in correct format yyy-mm-dd hh:mm:ss'),
    body('status').not().isEmpty().withMessage('Status must be fill').isNumeric().withMessage('Status must be integer'),
    body('empresa').not().isEmpty().withMessage('Empresa ID must be fill').isNumeric().withMessage('Empresa ID must be integer'),
  ]
}

module.exports = {
    facturaSearchRules,
    facturaValidationRules
}