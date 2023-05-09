const express = require('express');

const app = express();

const dbRes = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Smith' },
  { id: 3, name: 'Dino' },
  { id: 4, name: 'Alex' },
];

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
  // res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);

  res.json(dbRes);
});

app.listen(3001, () => {
  console.log('Example app listening on port 3000!');
});
