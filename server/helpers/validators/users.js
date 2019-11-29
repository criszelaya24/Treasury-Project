const jwt = require('jsonwebtoken')
const { body } = require('express-validator')
const secretKey = 'wilson-tesoreria'

const generateToken = (user) => {
    const token = jwt.sign(user, secretKey, { expiresIn: '1d' });
    return token
}

const isUserSignIn = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader === 'undefined') res.status(403).json({message: "Token Invalid"});
   // Split at the space
   const bearer = bearerHeader.split(' ');
   // Get token from array
   const bearerToken = bearer[1];
   try {
    const result = jwt.verify(bearerToken, secretKey);
    req.decoded = result
    next();
    // res.status(200).json({message: result})
   } catch(err){
    res.sendStatus(403).json({message: "Token Invalid"});
   }
}

const usersValidationRules = () => {
    return [
      body('name').not().isEmpty().withMessage('Name must me fill').isLength({min: 5}).withMessage('Lenght of name needs to be up of 5'),
      body('email').isEmail().withMessage('Need to be a valida email'),
      body('password').not().isEmpty().withMessage('Password must be fill'),
      body('typeUserId').not().isEmpty().withMessage('Required define a type of user').isNumeric().withMessage('Need to be a number')
    ]
  }

  const logInValidationRules = () => {
    return [
      body('email').isEmail().withMessage('Need to be a valida email'),
      body('password').not().isEmpty().withMessage('Password must be fill'),
    ]
  }

module.exports = {
    usersValidationRules,
    generateToken,
    isUserSignIn,
    logInValidationRules
}