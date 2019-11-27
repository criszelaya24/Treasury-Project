const express = require('express')
const cors = require('cors')
// Create the server
const app = express()
const { Pool } = require('pg');

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/../client/build')));

connectionString = {
  connectionString: process.env.DATABASE_URL,
  ssl: true
  };
const pool = new Pool(connectionString)

app.get('/api/', cors(), async (req, res, next) => {
  try {
    const result = 'Hello World'
    res.json({ result })
  } catch (err) {
    next(err)
  }
})// Serve our base route that returns a Hello World cow
app.get('/api/proveedores', cors(), async (req, res, next) => {
  try {
    pool.query('SELECT nombre FROM proveedores;', (err, result) => {
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
