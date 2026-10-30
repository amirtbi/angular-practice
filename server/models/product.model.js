const { db } = require('./db');

function toPublic(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    subtitle: row.subtitle,
    image: row.image,
    price: row.price,
    stock: row.stock,
  };
}

function list() {
  return db.prepare('SELECT * FROM products ORDER BY id').all().map(toPublic);
}

function find(id) {
  return toPublic(db.prepare('SELECT * FROM products WHERE id = ?').get(id));
}

function create(product) {
  const info = db.prepare(
    `INSERT INTO products (id, title, description, subtitle, image, price, stock)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    product.id ?? null,
    product.title,
    product.description,
    product.subtitle,
    product.image,
    product.price,
    product.stock,
  );
  return find(Number(info.lastInsertRowid));
}

function update(id, product) {
  const info = db.prepare(
    `UPDATE products
     SET title = ?, description = ?, subtitle = ?, image = ?, price = ?, stock = ?
     WHERE id = ?`
  ).run(product.title, product.description, product.subtitle, product.image, product.price, product.stock, id);
  if (info.changes === 0) return null;
  return find(id);
}

function remove(id) {
  return db.prepare('DELETE FROM products WHERE id = ?').run(id).changes > 0;
}

module.exports = { list, find, create, update, remove };
