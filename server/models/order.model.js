const { db } = require('./db');

function itemsFor(orderId) {
  return db.prepare(
    'SELECT product_id, amount, price FROM order_items WHERE order_id = ?'
  ).all(orderId).map((row) => ({
    productId: row.product_id,
    amount: row.amount,
    price: row.price,
  }));
}

function toPublic(row) {
  return {
    id: row.id,
    userId: row.user_id,
    items: itemsFor(row.id),
    total: row.total,
    createdAt: row.created_at,
  };
}

function listForUser(userId) {
  return db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY id').all(userId).map(toPublic);
}

function create(userId, items) {
  db.exec('BEGIN IMMEDIATE');
  try {
    let total = 0;
    const lines = [];
    const productStmt = db.prepare('SELECT * FROM products WHERE id = ?');
    const decrement = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?');

    for (const item of items) {
      const product = productStmt.get(item.productId);
      if (!product) {
        const err = new Error('product not found');
        err.status = 409;
        throw err;
      }
      const info = decrement.run(item.amount, item.productId, item.amount);
      if (info.changes !== 1) {
        const err = new Error('insufficient stock');
        err.status = 409;
        throw err;
      }
      total += product.price * item.amount;
      lines.push({ productId: product.id, amount: item.amount, price: product.price });
    }

    const createdAt = new Date().toISOString();
    const order = db.prepare(
      'INSERT INTO orders (user_id, total, created_at) VALUES (?, ?, ?)'
    ).run(userId, total, createdAt);
    const orderId = Number(order.lastInsertRowid);
    const insertItem = db.prepare(
      'INSERT INTO order_items (order_id, product_id, amount, price) VALUES (?, ?, ?, ?)'
    );
    for (const line of lines) insertItem.run(orderId, line.productId, line.amount, line.price);

    db.exec('COMMIT');
    return { id: orderId, userId, items: lines, total, createdAt };
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

module.exports = { listForUser, create };
