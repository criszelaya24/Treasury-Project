const { pool } = require('../db/dbConnection')

const getAllCurrencies = async (req, res)=> {
    try{
        pool.query('SELECT * FROM currencies', (err, result) => {
            if (err) res.status(404).json({message: 'Not currencies found'});
            res.status(200).json({message: "All currencies", data: result.rows})
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}
module.exports = {
    getAllCurrencies
}