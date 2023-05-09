const express = require('express');

const users = require('../../data/users');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  res.json(users[0]);
});

module.exports = router;
