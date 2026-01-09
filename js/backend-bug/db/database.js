const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/bugs.db', (err) => {
  if (err) {
    console.error('Error al conectar DB', err);
  } else {
    console.log('DB SQLite conectada');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS bugs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
