const { randomBytes, scryptSync, timingSafeEqual } = require('node:crypto');
const { db } = require('./db');

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 32).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const actual = scryptSync(password, salt, 32);
  const expected = Buffer.from(hash, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function toPublic(row) {
  return { userId: row.id, username: row.username, email: row.email, role: row.role };
}

function count() {
  return db.prepare('SELECT COUNT(*) AS n FROM users').get().n;
}

function create({ username, email, password, role }) {
  const info = db.prepare(
    'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)'
  ).run(username, email, hashPassword(password), role);
  return toPublic(db.prepare('SELECT * FROM users WHERE id = ?').get(Number(info.lastInsertRowid)));
}

function findByCredentials(username, email, password) {
  const row = db.prepare('SELECT * FROM users WHERE username = ? AND email = ?').get(username, email);
  if (!row || !verifyPassword(password, row.password_hash)) return null;
  return toPublic(row);
}

function findById(id) {
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  return row ? toPublic(row) : null;
}

module.exports = { count, create, findByCredentials, findById };
