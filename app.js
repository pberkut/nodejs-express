const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/contact', (req, res) => {
  res.send('<h1>Contact page!</h1>');
});

app.use((req, res, next) => {
  console.log('Наше промежуточное ПО!');
  next();
});

app.get('/contact/:id', (req, res) => {
  res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
  console.log(req.query);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
