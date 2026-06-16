# ReTrust+ ♻️

A premium, full-stack circular economy platform for refurbished electronics trading, verified e-waste recycling, and real-time carbon footprint offset tracking.

![ReTrust+ Hero Preview](./public/hero-preview.jpg)

*Note: The hero preview image is stored locally in your workspace artifacts. Please copy `media__1781581614612.jpg` from the artifacts directory to `public/hero-preview.jpg` to display it on GitHub.*

---

## 🌟 Key Features

### 🎨 Impactful Eco-Theme System (Light/Dark Mode)
* **Smooth Transitions & Micro-Animations:** Toggle between light and dark mode with fluid CSS transitions and rotating Sun/Moon button animations.
* **Carbon-Saving OLED Mode Toast:** Activating dark mode triggers an educational notification: *"Eco-Dark Mode activated! Reduces OLED battery draw and saves ~0.05g CO₂/min."*

### 🛒 Refurbished E-Commerce Marketplace
* **Product Catalog:** High-performance grid displaying quality refurbished electronics.
* **Filter System:** Dynamic filter toggles for category, price range, and condition.
* **Tactile Interactions:** Micro-scaling product cards with smooth shadow translations on hover.
* **User Cart & Checkout:** Stateful shopping cart, credit balance indicator, and order checkout flows.

### 📦 Device Returns & AI Diagnostics
* **Recycle Portal:** State-managed forms allowing users to list e-waste items for recycling.
* **ML Device Diagnostics:** Simulates machine learning condition grading to estimate device credit values.
* **Drag-and-Drop Uploader:** Streamlined photo upload component with interactive preview panels.

### 🗺️ Interactive Partner Locator
* **Live Mapping:** Integrates OpenStreetMap via Leaflet for locating nearby certified e-waste recycling centers.
* **Padded Geo-Search:** Seamless search input incorporating Lucide icons without overlap or input clipping.
* **Stateful Geolocation:** Automatic coordinates detection for local partner sorting.

### 📊 Impact & Carbon Offset Dashboard
* **Milestones Timeline:** Chronological achievements tracker visualizing user recycling progress.
* **Dynamic Progress Tracking:** Glassmorphic level indicators and eco-credits redemption widgets.
* **Milestone Achievements:** Customizable icon assets fully inverted/readable in dark mode.

### 🎮 "Eco-Banana Run" Arcade Game
* **Gamified Sustainability:** Side-scrolling arcade game embedded at the bottom of the home screen.
* **Game Mechanics:** Jump branches as a running monkey to collect bananas (`+10 pts`) while dodging hazardous waste obstacles (batteries `🔋`, televisions `📺`, bottles `🍼`, cans `🥫`).
* **Arcade Audio Synthesis:** Incorporates Web Audio API beep effects for jumping, collecting items, and taking hits without external assets.
* **High Score Tracking:** LocalStorage-persisted jungle high score board.

---

## 💻 Tech Stack

### Frontend Architecture
* **Core Framework:** [React.js](https://react.dev/) (v19 compatibility)
* **Build System:** [Vite](https://vitejs.dev/) (lightning-fast HMR and bundling)
* **Routing:** [React Router DOM](https://reactrouter.com/) (declarative SPA routing)
* **Styles & Animations:** [Tailwind CSS](https://tailwindcss.com/) (custom eco-friendly theme values) & [Framer Motion](https://www.framer.com/motion/) (orchestrated element entry/exit animations)
* **Vector Icons:** [Lucide React](https://lucide.dev/) (sleek, customizable SVG iconography)
* **Interactive Maps:** [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/) (geospatial markers and routing)
* **Network Requests:** [Axios](https://axios-http.com/) (promise-based HTTP client)
* **Feedback Alerts:** [React Toastify](https://fkhadra.github.io/react-toastify/) (toast notifications)

### Backend Architecture
* **Runtime Environment:** [Node.js](https://nodejs.org/)
* **Web Framework:** [Express.js](https://expressjs.com/) (RESTful routing and middleware handling)
* **Database & ODM:** [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) (schemas modeling and transaction storage)
* **Security & Hardening:**
  * **Helmet:** Adds secure HTTP response headers to defend against clickjacking, XSS, and injection attacks.
  * **Express Rate Limit:** Implements IP rate-limiting to prevent brute force and DDoS attacks.
  * **Compression:** Employs Gzip compression to optimize network payloads.
  * **Morgan:** Configures automated HTTP request logging.
  * **JWT (JSON Web Tokens):** Handles cryptographically signed authentication tokens.
  * **Dotenv:** Manages secure runtime environment configurations.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
* [MongoDB](https://www.mongodb.com/) (local daemon or Atlas cluster)

### 1. Installation
Clone the repository:
```bash
git clone https://github.com/your-username/retrust-plus.git
cd retrust-plus
```

Install the root dependencies (frontend):
```bash
npm install --legacy-peer-deps
```

Install the backend dependencies:
```bash
cd server
npm install
```

### 2. Environment Configuration
Create a `.env` file inside the `server/` directory:
```env
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/retrust
JWT_SECRET=your_jwt_signing_secret_key
PORT=5000
NODE_ENV=development
```

*(Note: Your `.env` files are ignored by git to protect credentials.)*

### 3. Running the Application
Start the backend server (from the `server/` directory):
```bash
npm run dev
```

Start the frontend development server (from the root directory):
```bash
npm run dev
```

* **Frontend Client:** [http://localhost:5173](http://localhost:5173)
* **Backend API Server:** [http://localhost:5000](http://localhost:5000)

---

## 📁 Folder Directory Structure
```text
├── components/          # Legacy components
├── pages/               # Legacy pages
├── public/              # Static assets & public images
│   └── hero-preview.jpg # Homepage header preview image
├── server/              # Node.js/Express.js Backend
│   ├── config/          # DB connection configuration
│   ├── controllers/     # API route handlers
│   ├── middlewares/     # Auth checks, rate-limiters, error handling
│   ├── models/          # MongoDB/Mongoose models
│   ├── routes/          # API express router mapping
│   └── server.js        # Main entry file
├── src/                 # React Frontend (Modernized)
│   ├── components/      # Glassmorphic cards, Navbar, Footer, EcoBananaRun
│   ├── context/         # AuthContext and ThemeContext
│   ├── pages/           # Shop, Return, Impact, Partners, About, Contact
│   ├── App.jsx          # Root page routing wrapper
│   ├── index.css        # Core Tailwind directives & PostCSS configurations
│   └── main.jsx         # Render mount point
├── tailwind.config.js   # Expanded colors, themes, animations
└── package.json         # Project manifests and scripts
```

---

## 🔒 Security Best Practices Implemented
* Strict CORS origin configuration.
* Helmet integration defending against malicious scripts.
* Rate limits restricting abusive queries.
* Comprehensive server-side error boundaries preventing stack trace leaks.
* Git untracking rules protecting environment credentials.

---

## 🤝 Contributing
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
Built with 💚 for a sustainable future by **Tanveer Singh**.
