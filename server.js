// ─── ARTSY'S PALETTE & PETALS — Node.js Backend ─────────────────────────────
// Stack: Express + MySQL + JWT + bcrypt
// Run: npm install && npm start

const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

// ── DB POOL ───────────────────────────────────────────────────────────────────
const db = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASS     || '',
  database: process.env.DB_NAME     || 'artsy_petals',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

// ── JWT MIDDLEWARE ────────────────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || 'artsy_secret_key_2025';

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ── AUTH ROUTES ───────────────────────────────────────────────────────────────

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields required' });

    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length) return res.status(409).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 12);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, hash]
    );

    const token = jwt.sign({ id: result.insertId, email, name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: result.insertId, name, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── BOUQUET ROUTES ────────────────────────────────────────────────────────────

// GET /api/bouquets
app.get('/api/bouquets', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bouquets WHERE active = 1 ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bouquets/:id
app.get('/api/bouquets/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bouquets WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ORDER ROUTES ──────────────────────────────────────────────────────────────

// POST /api/orders  (protected)
app.post('/api/orders', authMiddleware, async (req, res) => {
  try {
    const {
      type,           // 'preset' | 'custom'
      bouquet_id,     // for preset
      custom_details, // JSON string for custom
      delivery_date,
      delivery_message,
      total_price,
      payment_method,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO orders
        (user_id, type, bouquet_id, custom_details, delivery_date, delivery_message, total_price, payment_method, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [req.user.id, type, bouquet_id || null, custom_details || null,
       delivery_date, delivery_message, total_price, payment_method]
    );

    const orderId = result.insertId;

    // Build WhatsApp redirect URL
    const waMsg = encodeURIComponent(
      `🌸 New Order #${orderId}\n` +
      `Customer: ${req.user.name}\n` +
      `Type: ${type}\n` +
      `Delivery: ${delivery_date}\n` +
      `Total: ₹${total_price}\n` +
      (delivery_message ? `Message: ${delivery_message}` : '')
    );
    const waUrl = `https://wa.me/${process.env.SHOP_WHATSAPP || '919999999999'}?text=${waMsg}`;

    res.json({ orderId, waUrl, message: 'Order placed successfully 🌸' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/my  (protected)
app.get('/api/orders/my', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT o.*, b.name as bouquet_name, b.emoji
       FROM orders o
       LEFT JOIN bouquets b ON o.bouquet_id = b.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── WISHLIST ROUTES ───────────────────────────────────────────────────────────

// GET /api/wishlist  (protected)
app.get('/api/wishlist', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT w.id as wish_id, b.* FROM wishlist w
       JOIN bouquets b ON w.bouquet_id = b.id
       WHERE w.user_id = ?`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/wishlist/:bouquetId  (protected)
app.post('/api/wishlist/:bouquetId', authMiddleware, async (req, res) => {
  try {
    await db.query(
      'INSERT IGNORE INTO wishlist (user_id, bouquet_id) VALUES (?, ?)',
      [req.user.id, req.params.bouquetId]
    );
    res.json({ message: 'Added to wishlist 💝' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/wishlist/:bouquetId  (protected)
app.delete('/api/wishlist/:bouquetId', authMiddleware, async (req, res) => {
  try {
    await db.query(
      'DELETE FROM wishlist WHERE user_id = ? AND bouquet_id = ?',
      [req.user.id, req.params.bouquetId]
    );
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── CONTACT ROUTE ─────────────────────────────────────────────────────────────

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to DB
    await db.query(
      'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    // Optional: send email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.SHOP_EMAIL || process.env.EMAIL_USER,
        subject: `New Contact from ${name} 🌸`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
    }

    res.json({ message: 'Message received! Artsy will reply soon 🌸' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
});
// -- ROOT
const path = require('path');

// Serve static files (app.jsx, etc.)
app.use(express.static(path.join(__dirname)));

// ROOT — serve the frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// — HEALTH CHECK
app.get('/api/health',(_, res) => res.json({ status: 'ok 🌸', time: new Date() }));

// ── START ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🌸 Artsy server running on port ${PORT}`));

