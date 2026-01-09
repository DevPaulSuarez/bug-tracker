const express = require('express');
const app = express();
const db = require('./db/database');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/bugs', (req, res) => {
  db.all('SELECT * FROM bugs ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post('/bugs', (req, res) => {
  const { title, description } = req.body;
  db.run(
    'INSERT INTO bugs (title, description) VALUES (?, ?)',
    [title, description],
    function () {
      res.json({ id: this.lastID, title, description, status: 'open' });
    }
  );
});

app.patch('/bugs/:id', (req, res) => {
  db.run(
    'UPDATE bugs SET status = "resolved" WHERE id = ?',
    [req.params.id],
    () => res.json({ ok: true })
  );
});

app.listen(3000, () => console.log('Backend en http://localhost:3000'));
