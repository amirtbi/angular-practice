const products = require('../models/product.model');

function parseProduct(body) {
  if (!body) return null;
  const { title, description, subtitle, image, price, stock } = body;
  if (![title, description, subtitle, image].every((value) => typeof value === 'string' && value.trim())) return null;
  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) return null;
  if (!Number.isInteger(stock) || stock < 0) return null;
  return { title, description, subtitle, image, price, stock };
}

function list(req, res) {
  res.json(products.list());
}

function create(req, res) {
  const product = parseProduct(req.body);
  if (!product) return res.status(400).json({ error: 'invalid product' });
  res.status(201).json(products.create(product));
}

function update(req, res) {
  const id = Number(req.params.id);
  const product = parseProduct(req.body);
  if (!Number.isInteger(id) || !product) return res.status(400).json({ error: 'invalid product' });
  const saved = products.update(id, product);
  if (!saved) return res.status(404).json({ error: 'not found' });
  res.json(saved);
}

function remove(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid product' });
  if (!products.remove(id)) return res.status(404).json({ error: 'not found' });
  res.status(204).end();
}

module.exports = { list, create, update, remove };
