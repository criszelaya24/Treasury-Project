const { pool } = require('../db/dbConnection')
const bcrypt = require('bcrypt')
const validatorUser = require('../helpers/validators/users')
const getAllUsers = async (req, res) => {
    try {
        pool.query('SELECT * from users', (err, result)=>{
            if(err) res.status(404).json({message: 'Error at DB'});
            res.status(200).json({
                message: 'All users',
                data: result.rows,
                currentUser: req.decoded
            })
        })
    } catch (err) {
        res.status(500).json({message: 'Internal server error'})
    }
}

const signup = async(req, res) => {
    let { email, name, password, typeUserId } = req.body
    password = await bcrypt.hash(req.body.password, 8)
    const token = validatorUser.generateToken({email, typeUserId});
    console.log(token)
    try{
        pool.query('INSERT INTO users(email, name, password, type_user_id) VALUES ($1, $2, $3, $4) RETURNING *;',[
            email, name, password, parseInt(typeUserId)], (err, result) => {
                if (err) res.status(404).json({message: err});
                res.status(202).json({message: 'user created', id: result.rows, token: token})
            })
    }catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
}


module.exports = {
    getAllUsers,
    signup
}