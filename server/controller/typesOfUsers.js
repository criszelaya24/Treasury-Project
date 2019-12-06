const { pool } = require('../db/dbConnection')
const getTypeOfUsers = async(req, res) => {
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

const creatNewTypeOfUser = async (req, res) => {
    try{
        pool.query('INSERT INTO types_users(name) VALUES($1) RETURNING *', [req.body.name], (err, result)=>{
            if (err) res.status(404).json({message: err});
            if(result) res.status(201).json({message: 'New type of user created', type_user: result.rows[0]});
          })
    }catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
}

const listSpecificTypeOfUser = async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        pool.query('SELECT * FROM types_users WHERE id=$1;', [id], (err, result) => {
            if (err || result.rows.length < 1) res.status(404).json({message: "type of user not finded"});
            res.status(200).json(result.rows[0])
        });
    }catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
}

const deleteSpecificTypeOfUser = async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        pool.query('DELETE FROM types_users WHERE id=$1;', [id], (err, result) => {
            if (err || result.rowCount === 0) res.status(404).json({message: "type of user not finded"});
            if(result.rowCount === 1) res.status(200).json({message: 'type of user deleted'});
    });
    }catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
}

module.exports = {
    getTypeOfUsers,
    creatNewTypeOfUser,
    listSpecificTypeOfUser,
    deleteSpecificTypeOfUser
}