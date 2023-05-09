const express = require('express');
const fs = require('fs/promises');
const moment = require('moment');
const path = require('path');
const cors = require('cors');

const pathServerLog = path.join(__dirname, '/public/server.log');

const app = express();

// const corsMiddleware = cors();
// app.use(corsMiddleware);
app.use(cors());

const dbRes = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Smith' },
  { id: 3, name: 'Dino' },
  { id: 4, name: 'Alex' },
];

app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format('DD-MM-YYYY_hh:mm:ss');

  await fs.appendFile(pathServerLog, `\n${method} ${url} ${date}`);

  next();
});

app.use((req, res, next) => {
  console.log('Middleware');

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/contact', (req, res) => {
  res.send('<h1>Contact page!</h1>');
});

app.get('/contact/:id', (req, res) => {
  // res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);

  res.json(dbRes);
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.listen(3001, () => {
  console.log('Example app listening on port 3000!');
});
