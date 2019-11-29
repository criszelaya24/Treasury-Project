const { pool } = require('../db/dbConnection')

const listProveedores = async (req, res) => {
    try {
      pool.query('SELECT * FROM proveedores;', (err, result) => {
        if (err) res.status(404).json({error: 'Not provider found'});
        res.status(200).json({message: "All proveedores", data: result.rows})
      });
    } catch (err) {
        res.status(500).json({error: err})
    }
  }

const createProveedores = async (req, res) => {
  try {
    pool.query('INSERT INTO proveedores(name) VALUES($1) RETURNING *', [req.body.name], (err, result)=>{
      if (err) res.status(404).json({error: err});
        res.status(201).json({message: 'proveedor created', proveedor: result.rows[0]})
    })
  } catch(err) {
    res.status(500).json({ err: err })
  }
}

module.exports = {
    listProveedores,
    createProveedores
}