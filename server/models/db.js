const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const dbPath = process.env.DB_PATH || path.join(__dirname, '..', 'shop.db');
const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    image TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total REAL NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    price REAL NOT NULL
  );
`);

const SEED_PRODUCTS = [
  {
    id: 1,
    title: 'Product A',
    subtitle: 'subtitle',
    description: 'Product A description',
    image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
    price: 200,
    stock: 10,
  },
  {
    id: 2,
    title: 'Product B',
    subtitle: 'Premium Edition',
    description: 'Product B description with enhanced features and premium support.',
    image: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
    price: 100,
    stock: 10,
  },
  {
    id: 3,
    title: 'Product C',
    subtitle: 'Budget Friendly',
    description: 'Product C description, an affordable option for everyday use.',
    image: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp',
    price: 160,
    stock: 10,
  },
  {
    id: 4,
    title: 'Product D',
    subtitle: 'New Arrival',
    description: 'Product D description, the latest addition to our lineup.',
    image: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp',
    price: 400,
    stock: 10,
  },
  {
    id: 5,
    title: 'Product E',
    subtitle: 'Best Seller',
    description: 'Product E description, our most popular product among customers.',
    image: 'https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp',
    price: 1200,
    stock: 10,
  },
  {
    id: 6,
    title: 'Product F',
    subtitle: 'Limited Edition',
    description: 'Product F description, available for a limited time only.',
    image: 'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp',
    price: 600,
    stock: 10,
  },
];

function seed() {
  const { count, create } = require('./user.model');
  const productModel = require('./product.model');
  if (count() > 0) return;

  create({ username: 'admin', email: 'admin@shop.local', password: 'admin123', role: 'admin' });
  create({ username: 'buyer', email: 'user@shop.local', password: 'user123', role: 'user' });
  for (const product of SEED_PRODUCTS) productModel.create(product);
}

module.exports = { db, seed };
