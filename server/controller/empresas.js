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

const listSpecificEmpresa = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        pool.query('SELECT * FROM empresas WHERE id = $1;', [id], (err, result) => {
            if (err || result.rows.length < 1) res.status(404).json({message: 'empresa not finded'});
            res.status(200).json(result.rows[0])
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}

const deleteSpecificEmpresa = async (req, res) =>{
    const id = parseInt(req.params.id, 10);
    try {
        pool.query('DELETE FROM empresas WHERE id = $1;', [id], (err, result) => {
            if (err || result.rowCount === 0) res.status(404).json({message: 'empresa not finded'});
            if(result.rowCount === 1) res.status(200).json({message: 'Empresa deleted'});
        })
    }catch(err){
        res.status(500).json({message: err})
    }
}

const createEmpresa = async (req, res) => {
    const name = req.body.nombre
    try{
        pool.query('INSERT INTO empresas(nombre) VALUES($1) RETURNING *', [name], (err, result)=>{
            if (err) res.status(404).json({message: err});
            if(result) res.status(201).json({message: 'empresa created', empresa: result.rows[0]});
        })
    }catch(err){
        res.status(500).json({ message: err })
    }
}

module.exports = {
    listEmpresas,
    listSpecificEmpresa,
    createEmpresa,
    deleteSpecificEmpresa
}