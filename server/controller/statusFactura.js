const { pool } = require('../db/dbConnection')

const createNewStatusFactura = async(req, res) => {
    try{
        pool.query('INSERT INTO status_facturas(name) VALUES ($1)', [req.body.name], (err, result)=>{
            if (err) res.status(404).json({message: err});
            if(result) res.status(201).json({message: 'New status created', status: result.rows[0]});
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}

const getAllStatusFactura = async(req, res) => {
    try{
        pool.query('SELECT * FROM status_facturas;', (err, result) => {
            if (err) res.status(404).json({message: 'Not status factura found'});
            res.status(200).json({message: "All status factura", data: result.rows})
          });
    }catch(err){
        res.status(500).json({message: err})   
    }
}

const listStatusFactura = async(req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        pool.query('SELECT * FROM status_facturas WHERE id=$1;', [id], (err, result) => {
            if (err || result.rows.length < 1) res.status(404).json({message: "status factura not finded"});
            res.status(200).json(result.rows[0])
        });
    }catch(err){
        res.status(500).json({message: err})      
    }
}

const deleteStatusFactura = async(req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        pool.query('DELETE FROM status_facturas WHERE id=$1;', [id], (err, result) => {
            if (err || result.rowCount === 0) res.status(404).json({message: 'status factura not finded'});
            if(result.rowCount === 1) res.status(200).json({message: 'status factura deleted'});
        });
    }catch(err){
        res.status(500).json({message: err})      
    }
}
module.exports = {
    createNewStatusFactura,
    getAllStatusFactura,
    listStatusFactura,
    deleteStatusFactura
}