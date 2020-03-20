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

const createNewCurrency = async (req, res)=>{
    try{
        const name = req.body.name
        const symbol = req.body.symbol
        pool.query('INSERT INTO currencies(name, symbol) VALUES($1, $2) RETURNING *', [name, symbol], (err, result)=>{
            if (err) res.status(404).json({message: err});
            if(result) res.status(201).json({message: 'currency created', currency: result.rows[0]});
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}

const listSpecificCurreny = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        pool.query('SELECT * FROM currencies WHERE id = $1;', [id], (err, result) => {
            if (err || result.rows.length < 1) res.status(404).json({message: 'currency not finded'});
            res.status(200).json(result.rows[0])
        })
    }catch(err) {
        res.status(500).json({message: err})
    }
}

const deleteSpecificCurrency = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try{
        pool.query('DELETE FROM currencies WHERE id = $1;', [id], (err, result) => {
            if (err || result.rowCount === 0) res.status(404).json({message: 'currency not finded'});
            if(result.rowCount === 1) res.status(200).json({message: 'currency deleted'});
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}
module.exports = {
    getAllCurrencies,
    createNewCurrency,
    listSpecificCurreny,
    deleteSpecificCurrency
}