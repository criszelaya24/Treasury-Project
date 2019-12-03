const { pool } = require('../db/dbConnection')

const listFacturas = async (req, res) => {
    try{
        pool.query('SELECT * FROM facturas;', (err, result) => {
            if (err) res.status(404).json({message: 'Not facturas found'});
            res.status(200).json({message: "All facturas", data: result.rows})
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}

const listSpecificFactura = async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        console.log(id)
        pool.query('SELECT * FROM facturas WHERE id=$1;', [id], (err, result) => {
            if (err || result.rows.length < 1) res.status(404).json({message: 'factura not finded'});
            res.status(200).json(result.rows[0])
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}

module.exports = {
    listFacturas,
    listSpecificFactura
}