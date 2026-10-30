const { randomBytes } = require('node:crypto');
const { db } = require('./db');
const { findById } = require('./user.model');

function create(userId) {
  const token = randomBytes(32).toString('hex');
  db.prepare('INSERT INTO sessions (token, user_id) VALUES (?, ?)').run(token, userId);
  return token;
}

function userForToken(token) {
  const row = db.prepare('SELECT user_id FROM sessions WHERE token = ?').get(token);
  return row ? findById(row.user_id) : null;
}

function remove(token) {
  db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
}

module.exports = { create, userForToken, remove };
