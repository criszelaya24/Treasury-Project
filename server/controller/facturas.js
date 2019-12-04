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

const deleteSpecificFactura = async (req, res) =>{
    const id = parseInt(req.params.id, 10);
    try{
        pool.query('DELETE FROM facturas WHERE id = $1;', [id], (err, result) => {
            if (err || result.rowCount === 0) res.status(404).json({message: 'factura not finded'});
            if(result.rowCount === 1) res.status(200).json({message: 'factura deleted'});
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}

const createNewFactura = async (req, res) => {
    const numero = parseInt(req.body.numero, 10);
    const proveedor = parseInt(req.body.proveedor, 10);
    const currency = parseInt(req.body.currency, 10);
    const monto = parseInt(req.body.monto);
    const detalle = req.body.detalle
    const fecha = Date.parse(req.body.fecha)
    const vencimiento = Date.parse(req.body.vencimiento)
    const status = parseInt(req.body.status, 10);
    const empresa = parseInt(req.body.empresa, 10);
    try{
        pool.query('INSERT INTO facturas(numero, proveedor, currency_id, monto, detalle, fecha, vencimiento, status_id, empresa) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;',
        [numero, proveedor, currency, monto, detalle, fecha, vencimiento, status, empresa], (err, result) => {
            if (err.code === '23505') res.status(406).json({message: 'Factura with proveedor already exist'});
            if (err) res.status(400).json({message: err});
            if(result) res.status(202).json({message: 'factura created', user: result.rows[0]});
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}

module.exports = {
    listFacturas,
    listSpecificFactura,
    deleteSpecificFactura,
    createNewFactura
}