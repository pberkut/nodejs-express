const express = require('express');
const fs = require('fs/promises');
const moment = require('moment');
const path = require('path');
const cors = require('cors');

const pathServerLog = path.join(__dirname, '/public/server.log');

const users = require('./db/users');
let count = null;

const app = express();

// const corsMiddleware = cors();
// app.use(corsMiddleware);
app.use(cors());

app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format('DD-MM-YYYY_hh:mm:ss');

  await fs.appendFile(pathServerLog, `\n${method} ${url} ${date}`);

  next();
});

app.use((req, res, next) => {
  count += 1;
  console.log(`Middleware ${count}`);

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/contacts', (req, res) => {
  // res.send('<h1>Contact page!</h1>');
  res.json(users);
});

app.get('/contacts/:id', (req, res) => {
  // res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.listen(3001, () => {
  console.log('Example app listening on port 3000!');
});
