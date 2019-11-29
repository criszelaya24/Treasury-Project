const express = require('express');
const router = express.Router();
const usersController = require('../controller/users')
const { usersValidationRules, isUserSignIn } = require('../helpers/validators/users')
const { validate } = require('../helpers/validateResults')

router.get('/', isUserSignIn, usersController.getAllUsers)
router.post('/', isUserSignIn, usersValidationRules(), validate, usersController.createUser)

module.exports = router