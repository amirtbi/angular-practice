const sessions = require('../models/session.model');

function tokenFrom(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : '';
}

function requireAuth(req, res, next) {
  const token = tokenFrom(req);
  const user = token && sessions.userForToken(token);
  if (!user) return res.status(401).json({ error: 'unauthorized' });
  req.user = user;
  req.token = token;
  next();
}

function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
  next();
}

module.exports = { requireAuth, requireAdmin };
