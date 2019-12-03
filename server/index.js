const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Create the server
const app = express()
const path = require('path')

// use middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));

//load routes
const proveedores = require('./routes/proveedores')
const users = require('./routes/users')
const userToken = require('./routes/token')
const empresas = require('./routes/empresas')
const facturas = require('./routes/facturas')

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

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

// general routes
})
app.use('/api/proveedores', cors(), proveedores)
app.use('/api/users', cors(), users)
app.use('/api/user_token', cors(), userToken)
app.use('/api/empresas', cors(), empresas)
app.use('/api/facturas', cors(), facturas)

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
})
