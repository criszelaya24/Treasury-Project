const express = require('express');
const router = express.Router();
const usersController = require('../controller/users')
const typeOfUsersController = require('../controller/typesOfUsers')
const { usersValidationRules, isUserSignIn, userSearchRules } = require('../helpers/validators/users')
const { typeOfUsersValidationRules, typeOfUserSearchRules } = require('../helpers/validators/typesOfUsers')
const { validate } = require('../helpers/validateResults')

router.get('/', isUserSignIn, usersController.getAllUsers)
router.post('/', isUserSignIn, usersValidationRules(), validate, usersController.createUser)
router.get('/types', isUserSignIn, typeOfUsersController.getTypeOfUsers)
router.post('/types', isUserSignIn, typeOfUsersValidationRules(), validate, typeOfUsersController.creatNewTypeOfUser)
router.get('/types/:id', isUserSignIn, typeOfUserSearchRules(), validate, typeOfUsersController.listSpecificTypeOfUser)
router.delete('/types/:id', isUserSignIn, typeOfUserSearchRules(), validate, typeOfUsersController.deleteSpecificTypeOfUser)
router.get('/:id', isUserSignIn, userSearchRules(), validate, usersController.listSpecificUser)
router.delete('/:id', isUserSignIn, userSearchRules(), validate, usersController.deleteSpecificUser)

module.exports = router