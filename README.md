# ReTrust+

A full-stack sustainable retail platform for refurbished products, e-waste returns, and impact tracking.

## Overview
ReTrust+ is a modern web application that empowers users to shop refurbished products, return used items for credits, and track their environmental impact. The platform features user authentication, a dynamic dashboard, credit system, partner locator, and more.

## Features
- **User Authentication** (JWT, secure, persistent)
- **Profile Dashboard** (stats, credit history, returns, notifications)
- **Shop** (redeem credits for products)
- **Return Products** (submit returns, earn credits, track impact)
- **Impact Dashboard** (CO₂ saved, items returned, credits earned)
- **Partner Locator** (find e-waste partners on a map)
- **Notifications** (status changes, credit redemptions)
- **Responsive UI** (mobile-friendly, modern design)

## Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js, MongoDB, JWT, dotenv, CORS
- **Deployment:** Vercel/Netlify (frontend), Render/Heroku (backend), MongoDB Atlas

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/retrust-plus.git
cd retrust-plus
```

### 2. Install Dependencies
```bash
# For frontend
npm install
# For backend
cd server
npm install
```

### 3. Environment Variables
Create a `.env` file in the `server/` directory:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the App
```bash
# Start backend (from /server)
npm run dev
# Start frontend (from project root)
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Deployment
- **Frontend:** Deploy `dist/` to Vercel, Netlify, or similar.
- **Backend:** Deploy `server/` to Render, Heroku, or similar. Set environment variables in your hosting dashboard.
- **MongoDB:** Use MongoDB Atlas for production.

## Folder Structure
- `/src` — React frontend
- `/server` — Node.js/Express backend
- `/public/assets` — Images and static assets

## Credits
- Built with ❤️ by Tanveer Singh
- Inspired by sustainable commerce and circular economy principles

---
Feel free to open issues or contribute!
