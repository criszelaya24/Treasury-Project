const express = require('express')
const cors = require('cors')
const path = require('path')

// Create the server
const app = express()

// Connect to the PSQL Heroku DB
const { Pool } = require('pg');
connectionString = {
  connectionString: process.env.DATABASE_URL,
  ssl: true
  };
const pool = new Pool(connectionString)

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('/api/', cors(), async (req, res, next) => {
  try {
    const result = 'API Wilson-tesoreria'
    res.json({ result })
  } catch (err) {
    next(err)
  }
})

app.get('/api/facturas', cors(), async (req, res, next) => {
  try {
    pool.query('SELECT * FROM facturas;', (err, result) => {
      if (err) throw err;
      values = result.rows
      res.json(values)
    });
  } catch (err) {
    next(err)
  }
})

app.get('/api/empresas', cors(), async (req, res, next) => {
  try {
    pool.query('SELECT * FROM empresas;', (err, result) => {
      if (err) throw err;
      values = result.rows
      res.json(values)
    });
  } catch (err) {
    next(err)
  }
})

app.get('/api/facturas/:id', cors(), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    console.log(id)
    pool.query('SELECT * FROM facturas WHERE id=$1;', [id], (err, result) => {
      if (err) throw err;
      values = result.rows
      res.json(values)
    });
  } catch (err) {
    next(err)
  }
}) 


app.get('/api/proveedores/:id', cors(), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    console.log(id)
    pool.query('SELECT * FROM proveedores WHERE id=$1;', [id], (err, result) => {
      if (err) throw err;
      values = result.rows
      res.json(values)
    });
  } catch (err) {
    next(err)
  }
}) 

app.get('/api/empresas/:id', cors(), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    console.log(id)
    pool.query('SELECT * FROM empresas WHERE id=$1;', [id], (err, result) => {
      if (err) throw err;
      values = result.rows
      res.json(values)
    });
  } catch (err) {
    next(err)
  }
}) 

app.get('/api/proveedores', cors(), async (req, res, next) => {
  try {
    pool.query('SELECT id, nombre FROM proveedores;', (err, result) => {
      if (err) throw err;
      values = result.rows
      res.json(values)
    });
  } catch (err) {
    next(err)
  }
})

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
})
