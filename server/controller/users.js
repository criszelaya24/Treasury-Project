const { pool } = require('../db/dbConnection')
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {
    try {
        pool.query('SELECT * from users WHERE email != $1', [req.decoded.email], (err, result)=>{
            if(err) res.status(400).json({message: 'Error at DB'});
            res.status(200).json({
                message: 'All users',
                data: result.rows
            })
        })
    } catch (err) {
        res.status(500).json({message: 'Internal server error'})
    }
}

const createUser = async(req, res) => {
    let { email, name, password, typeUserId } = req.body
    password = await bcrypt.hash(req.body.password, 8)
    try{
        pool.query('INSERT INTO users(email, name, password, type_user_id) VALUES ($1, $2, $3, $4) RETURNING *;',[
            email, name, password, parseInt(typeUserId)], (err, result) => {
                if (err) res.status(400).json({message: err});
                if(result) res.status(202).json({message: 'user created', user: result.rows[0]});
            })
    }catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
}

const getTypeOfUsers = async(req, res) => {
    console.log('hey')
    try{
        pool.query('SELECT * FROM types_users', (err, result) => {
            if(err) res.status(400).json({message: 'Error at DB'});
            res.status(200).json({
                message: 'All type of users',
                data: result.rows
            })
        })
    }catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
}


module.exports = {
    getAllUsers,
    createUser,
    getTypeOfUsers
}