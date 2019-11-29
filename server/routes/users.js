const express = require('express');
const router = express.Router();
const usersController = require('../controller/users')
const { usersValidationRules, verifyToken } = require('../helpers/validators/users')
const { validate } = require('../helpers/validateResults')

router.get('/', verifyToken, usersController.getAllUsers)
router.post('/', usersValidationRules(), validate, usersController.signup)

module.exports = router