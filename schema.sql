-- ─── ARTSY'S PALETTE & PETALS — MySQL Schema ────────────────────────────────
-- Run this file once to set up the database
-- mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS artsy_petals
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE artsy_petals;

-- ── USERS ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100)         NOT NULL,
  email         VARCHAR(150)         NOT NULL UNIQUE,
  password_hash VARCHAR(255)         NOT NULL,
  phone         VARCHAR(20)          DEFAULT NULL,
  avatar_url    VARCHAR(500)         DEFAULT NULL,
  created_at    TIMESTAMP            DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP            DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- ── BOUQUETS ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bouquets (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(150)         NOT NULL,
  emoji         VARCHAR(10)          DEFAULT '🌸',
  flowers       TEXT                 NOT NULL,
  description   TEXT,
  price         DECIMAL(10,2)        NOT NULL,
  tag           VARCHAR(50)          DEFAULT NULL,
  image_url     VARCHAR(500)         DEFAULT NULL,
  active        TINYINT(1)           DEFAULT 1,
  created_at    TIMESTAMP            DEFAULT CURRENT_TIMESTAMP
);

-- ── SEED BOUQUETS ─────────────────────────────────────────────────────────────
INSERT INTO bouquets (name, emoji, flowers, description, price, tag) VALUES
  ('Romantic Roses',     '🌹', 'Red Roses, Baby\'s Breath, Eucalyptus', 'Classic romance in every petal',            1299.00, 'Bestseller'),
  ('Lavender Dream',     '💜', 'Lavender, White Peonies, Lilac',        'A dreamy blend of calm and beauty',          1099.00, 'Popular'),
  ('Spring Garden Mix',  '🌷', 'Tulips, Daisies, Iris, Greenery',       'A burst of spring freshness',                 999.00, 'Seasonal'),
  ('Sunflower Joy',      '🌻', 'Sunflowers, Orange Roses, Marigold',    'Bright and cheerful arrangement',             899.00, 'Happy Pick'),
  ('Peony Paradise',     '🌸', 'Pink Peonies, Blush Roses, Ranunculus', 'Luxuriously soft and romantic',              1499.00, 'Premium'),
  ('Orchid Elegance',    '🪷', 'Purple Orchids, Anthuriums, Palms',     'Exotic sophistication in a vase',            1799.00, 'Luxury'),
  ('Wildflower Whisper', '🌼', 'Daisies, Cosmos, Cornflowers, Herbs',   'Free-spirited meadow charm',                  799.00, 'Whimsical'),
  ('Blush & Bloom',      '🌺', 'Blush Roses, Peonies, Sweet Peas',      'The perfect soft romantic gift',             1199.00, 'Gift Pick');

-- ── ORDERS ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  user_id          INT               NOT NULL,
  type             ENUM('preset','custom') DEFAULT 'preset',
  bouquet_id       INT               DEFAULT NULL,
  custom_details   JSON              DEFAULT NULL,
  delivery_date    DATE              DEFAULT NULL,
  delivery_message TEXT              DEFAULT NULL,
  total_price      DECIMAL(10,2)     NOT NULL,
  payment_method   VARCHAR(50)       DEFAULT 'UPI',
  status           ENUM('pending','confirmed','processing','delivered','cancelled') DEFAULT 'pending',
  created_at       TIMESTAMP         DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP         DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)     REFERENCES users(id)     ON DELETE CASCADE,
  FOREIGN KEY (bouquet_id)  REFERENCES bouquets(id)  ON DELETE SET NULL,
  INDEX idx_user_orders (user_id)
);

-- ── WISHLIST ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlist (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  bouquet_id  INT NOT NULL,
  added_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_wish (user_id, bouquet_id),
  FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
  FOREIGN KEY (bouquet_id) REFERENCES bouquets(id) ON DELETE CASCADE
);

-- ── SAVED CUSTOM BOUQUETS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS saved_bouquets (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  user_id        INT  NOT NULL,
  name           VARCHAR(150) DEFAULT 'My Custom Bouquet',
  custom_details JSON NOT NULL,
  price_estimate DECIMAL(10,2),
  saved_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── CONTACT MESSAGES ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100),
  email      VARCHAR(150),
  message    TEXT,
  replied    TINYINT(1) DEFAULT 0,
  sent_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
