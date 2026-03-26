# 🌸 Artsy's Palette & Petals

> A dreamy full-stack flower shop — React + Node.js + MySQL

---

## 🗂️ Project Structure

```
artsy/
├── index.html        ← Frontend entry (open in browser)
├── app.jsx           ← Complete React app (all pages + components)
├── server.js         ← Node.js + Express backend
├── schema.sql        ← MySQL database schema + seed data
├── package.json      ← Backend dependencies
└── .env.example      ← Environment variables template
```

---

## ⚡ Quick Start

### Frontend (Static — no build needed)
Open `index.html` directly in your browser, or serve it:
```bash
npx serve .
# → http://localhost:3000
```

### Backend
```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your MySQL credentials

# 3. Set up database
mysql -u root -p < schema.sql

# 4. Start server
npm run dev      # development (nodemon)
npm start        # production
# → http://localhost:5000
```

---

## 🌸 Features

| Feature | Status |
|---|---|
| Home with Artsy Hero Chat | ✅ |
| Day / Night Theme Toggle | ✅ |
| Bouquet Shop with Filters | ✅ |
| Custom Bouquet Builder | ✅ |
| AI Recommendations Quiz | ✅ |
| Floating Artsy Chat Widget | ✅ |
| Login / Sign Up Page | ✅ |
| User Dashboard | ✅ |
| WhatsApp Order Redirect | ✅ |
| Contact Form | ✅ |
| Responsive (Mobile + Tablet + Desktop) | ✅ |
| JWT Auth | ✅ |
| MySQL Schema + Seed Data | ✅ |
| Email Notifications | ✅ |

---

## 🎨 Pages

- `/` → Home — Hero, Artsy intro chat, featured bouquets
- `Shop` → All 8 bouquets with tag filters + cart
- `Customize` → Interactive bouquet builder with live price preview
- `Recommendations` → 4-step quiz → personalized bouquet suggestion
- `About Artsy` → Brand story, stats
- `Contact` → WhatsApp, call, email form, map link
- `Login/Signup` → Animated auth page
- `Dashboard` → Orders, wishlist, profile

---

## 📱 WhatsApp Integration

When a customer places an order (custom or preset), they're redirected to:
```
https://wa.me/919999999999?text=<pre-filled order details>
```
Update `SHOP_WHATSAPP` in `.env` with the shop's actual number.

---

## 🚀 Deployment

**Frontend:** Upload to Netlify / Vercel / GitHub Pages  
**Backend:** Deploy to Railway / Render / VPS  
**Database:** PlanetScale / Railway MySQL / AWS RDS

---

## 🌺 Credits

Built with 💕 for Artsy's Palette & Petals  
Mancherial, Telangana, India 🇮🇳
