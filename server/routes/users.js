const express = require('express');
const router = express.Router();
const usersController = require('../controller/users')
const typeOfUsersController = require('../controller/typesOfUsers')
const { usersValidationRules, isUserSignIn } = require('../helpers/validators/users')
const { typeOfUsersValidationRules } = require('../helpers/validators/typesOfUsers')
const { validate } = require('../helpers/validateResults')

router.get('/', isUserSignIn, usersController.getAllUsers)
router.post('/', isUserSignIn, usersValidationRules(), validate, usersController.createUser)
router.get('/types', isUserSignIn, typeOfUsersController.getTypeOfUsers)
router.post('/types', isUserSignIn, typeOfUsersValidationRules(), validate, typeOfUsersController.creatNewTypeOfUser)

module.exports = router