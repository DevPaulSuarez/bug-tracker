const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors()); // permite cualquier origen

// Middleware para parsear JSON
app.use(express.json());

// Array que guarda los bugs (temporal, en memoria)
let bugs = [];

// Obtener todos los bugs
app.get('/bugs', (req, res) => {
  res.json(bugs);
});

// Crear un bug
app.post('/bugs', (req, res) => {
  // Validar que vengan los datos
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const bug = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    status: 'open' // valor inicial correcto
  };
  bugs.push(bug);
  res.status(201).json(bug);
});

// Marcar un bug como resuelto
app.patch('/bugs/:id', (req, res) => {
  const bug = bugs.find(b => b.id == req.params.id);
  if (!bug) return res.sendStatus(404);

  bug.status = 'resolved';
  res.json(bug);
});

// Evitar 404 de favicon
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// Iniciar servidor
app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});