const users = require('../models/user.model');
const sessions = require('../models/session.model');

function login(req, res) {
  const { username, email, password } = req.body || {};
  if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string' || !username || !email || !password) {
    return res.status(400).json({ error: 'username, email, and password are required' });
  }

  const user = users.findByCredentials(username, email, password);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });

  res.json({ token: sessions.create(user.userId), user });
}

function logout(req, res) {
  sessions.remove(req.token);
  res.status(204).end();
}

module.exports = { login, logout };
