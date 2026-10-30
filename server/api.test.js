const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

process.env.DB_PATH = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'shop-')), 'shop.db');

const { app } = require('./app');

let base;
let server;

test.before(async () => {
  server = await new Promise((resolve) => {
    const listening = app.listen(0, '127.0.0.1', () => resolve(listening));
  });
  base = `http://127.0.0.1:${server.address().port}`;
});

test.after(() => new Promise((resolve) => server.close(resolve)));

function post(pathname, body, token) {
  return fetch(base + pathname, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
}

test('login requires username, email, and password', async () => {
  const res = await post('/login', { email: 'user@shop.local', password: 'user123' });
  assert.equal(res.status, 400);
});

test('login returns a session token', async () => {
  const res = await post('/login', {
    username: 'buyer',
    email: 'user@shop.local',
    password: 'user123',
  });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(typeof body.token, 'string');
  assert.ok(body.token.length > 0);
  assert.equal(body.user.username, 'buyer');
  assert.equal(body.user.password, undefined);
  assert.equal(body.user.password_hash, undefined);
});

test('a buyer cannot create a product', async () => {
  const login = await post('/login', {
    username: 'buyer',
    email: 'user@shop.local',
    password: 'user123',
  });
  const { token } = await login.json();
  const res = await post('/products', {
    title: 'Nope',
    description: 'no',
    subtitle: 'no',
    image: 'https://example.com/no.webp',
    price: 1,
    stock: 1,
  }, token);
  assert.equal(res.status, 403);
});

test('a buy lowers stock and a second buy past stock returns 409', async () => {
  const login = await post('/login', {
    username: 'buyer',
    email: 'user@shop.local',
    password: 'user123',
  });
  const { token } = await login.json();
  const products = await (await fetch(base + '/products')).json();
  const product = products.find((item) => item.id === 1);

  const bought = await post('/orders', {
    items: [{ productId: product.id, amount: product.stock }],
  }, token);
  assert.equal(bought.status, 201);

  const after = (await (await fetch(base + '/products')).json()).find((item) => item.id === 1);
  assert.equal(after.stock, 0);

  const again = await post('/orders', {
    items: [{ productId: product.id, amount: 1 }],
  }, token);
  assert.equal(again.status, 409);

  const still = (await (await fetch(base + '/products')).json()).find((item) => item.id === 1);
  assert.equal(still.stock, 0);
});
