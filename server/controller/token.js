const { pool } = require('../db/dbConnection')
const bcrypt = require('bcrypt')
const validatorUser = require('../helpers/validators/users')

const createToken = async (req, res) => {
    try {
        const {email, password} = req.body
        pool.query('SELECT * FROM USERS where email = $1', [email], (err, result)=>{
            if (err) res.status(404).json({message: "User Don't found"});
            bcrypt.compare(password, result.rows[0].password).then(match => {
                if (match){
                    const user = {
                        email: result.rows[0].email,
                        typeUserId: result.rows[0].type_user_id
                    }
                    const token = validatorUser.generateToken(user);
                    res.status(201).json({message: "User token", token: token})
                }
                res.status(401).json({message: "Wrong password"})
            })
        })
    }catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
}

module.exports = {
    createToken
}