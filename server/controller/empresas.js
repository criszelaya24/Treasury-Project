const { pool } = require('../db/dbConnection')

const listEmpresas = async (req, res) => {
    try {
        pool.query('SELECT * FROM empresas;', (err, result) => {
            if (err) res.status(404).json({message: 'Not empresas found'});
            res.status(200).json({message: "All empresas", data: result.rows})
        })
    } catch (err){
        res.status(500).json({message: err})
    }
}

module.exports = {
    listEmpresas
}