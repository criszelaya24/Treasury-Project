const { pool } = require('../db/dbConnection')

const getProveedores = async (req, res) => {
    try {
      pool.query('SELECT * FROM proveedores;', (err, result) => {
        if (err) res.status(404).json({error: 'Not provider found'});
        res.status(200).json(result.rows)
      });
    } catch (err) {
        res.status(404).json({error: err})
    }
  }



module.exports = {
    getProveedores
}