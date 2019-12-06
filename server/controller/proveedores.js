const { pool } = require('../db/dbConnection')

const listProveedores = async (req, res) => {
    try {
      pool.query('SELECT * FROM proveedores;', (err, result) => {
        if (err) res.status(404).json({message: 'Not proveedores found'});
        res.status(200).json({message: "All proveedores", data: result.rows})
      });
    } catch (err) {
        res.status(500).json({message: err})
    }
  }

const createProveedores = async (req, res) => {
  try {
    pool.query('INSERT INTO proveedores(name) VALUES($1) RETURNING *', [req.body.name], (err, result)=>{
      if (err) res.status(404).json({message: err});
      if(result) res.status(201).json({message: 'proveedor created', proveedor: result.rows[0]});
    })
  } catch(err) {
    res.status(500).json({ message: err })
  }
}

const findProveedores = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    pool.query('SELECT * FROM proveedores WHERE id=$1;', [id], (err, result) => {
      if (err || result.rows.length < 1) res.status(404).json({message: "Proveedor not finded"});
      res.status(200).json(result.rows[0])
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal error' })
  }
}

const deleteSpecificProveedor = async (req, res) =>{
  const id = parseInt(req.params.id, 10);
  try{
      pool.query('DELETE FROM proveedores WHERE id = $1;', [id], (err, result) => {
          if (err || result.rowCount === 0) res.status(404).json({message: 'proveedor not finded'});
          if(result.rowCount === 1) res.status(200).json({message: 'proveedor deleted'});
      })
  }catch(err){
      res.status(500).json({message: err})
  }
}

module.exports = {
    listProveedores,
    createProveedores,
    findProveedores,
    deleteSpecificProveedor
}