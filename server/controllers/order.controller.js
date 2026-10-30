const orders = require('../models/order.model');

function parseItems(body) {
  if (!body || !Array.isArray(body.items) || body.items.length === 0) return null;
  const items = [];
  for (const item of body.items) {
    const productId = Number(item?.productId);
    const amount = Number(item?.amount);
    if (!Number.isInteger(productId) || productId < 1) return null;
    if (!Number.isInteger(amount) || amount < 1) return null;
    items.push({ productId, amount });
  }
  return items;
}

function create(req, res) {
  const items = parseItems(req.body);
  if (!items) return res.status(400).json({ error: 'invalid order' });

  try {
    res.status(201).json(orders.create(req.user.userId, items));
  } catch (err) {
    if (err.status === 409) return res.status(409).json({ error: err.message });
    throw err;
  }
}

function list(req, res) {
  res.json(orders.listForUser(req.user.userId));
}

module.exports = { create, list };
