const express = require('express');
const { static } = express;
const path = require('path');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/dist', static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, '..', '/public')))


app.use('/api', require('./api'));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '..', 'src', 'index.html')));

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })

  module.exports = app;