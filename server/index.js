const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Create the server
const app = express()
const path = require('path')

// connect to heroku
const { pool } = require('./db/dbConnection')
// use middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));

//load routes
const proveedores = require('./routes/proveedores')
const users = require('./routes/users')
const userToken = require('./routes/token')

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/../client/build')));

// Serve our base route that returns a Hello World cow
app.get('/api/status', cors(), async (req, res, next) => {
  try {
    const result = 'Connected'
    res.status(200).json({ message: result })
  } catch (err) {
    next(err)
  }

// routes to put on controller
app.get('/api/facturas', cors(), async (req, res, next) => {
  res.status(200)
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

// end of routes to put on controller

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

// general routes
})
app.use('/api/proveedores', cors(), proveedores)
app.use('/api/users', cors(), users)
app.use('/api/user_token', cors(), userToken)

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
})
