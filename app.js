const express = require('express');
const fs = require('fs/promises');
const moment = require('moment');
const path = require('path');
const cors = require('cors');

const pathServerLog = path.join(__dirname, '/public/server.log');

const contactsRouter = require('./routes/api/contacts');

let count = null;

const app = express();

app.use(cors());

app.use(async (req, res, next) => {
  // logs request
  const { method, url } = req;
  const date = moment().format('DD-MM-YYYY_hh:mm:ss');

  await fs.appendFile(pathServerLog, `\n${method} ${url} ${date}`);

  next();
});

app.use((req, res, next) => {
  // Count request
  count += 1;
  console.log(`Middleware ${count}`);
  next();
});

app.use('/api/contacts', contactsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});
