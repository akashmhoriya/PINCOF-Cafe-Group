# AURELIA — Specialty Coffee Roasters & Slow Bar
### Full-Stack MERN Portfolio Website with GSAP & MongoDB

Aurelia is a full-stack MERN specialty café portfolio web application crafted from scratch with a warm editorial aesthetic, custom typography, GSAP animations, and a responsive MongoDB backend.

---

## ☕ Key Highlights

- **Aesthetic & Brand System**: Warm espresso brown, dark obsidian, caramel tones, and cream palettes paired with *Cormorant Garamond* and *Plus Jakarta Sans* editorial typography.
- **GSAP Animation Engine**:
  - Initial loading sequence with SVG coffee bean path drawing and brand mark reveal
  - Smooth magnetic desktop follower cursor with interaction awareness
  - Full-screen pinned horizontal scroll section for the slow bar experience
  - Split-screen mask reveal for the café introduction
  - Live numerical counters triggered by GSAP ScrollTrigger
  - Cinematic page transition route wipes
  - Staggered entrance animations for menu items and navigation drawers
- **Genuine MERN Backend**:
  - Node.js & Express REST API
  - Cloud / Local MongoDB with Mongoose ODM
  - Validated Mongoose models (`Menu`, `ContactMessage`)
  - Automated artisan seed data script with 21 curated culinary and coffee items
  - Production-ready error handling, CORS, and health checks
- **Responsive & Accessible Design**:
  - Full support for 390px mobile, 768px tablet, and 1440px+ ultrawide viewports
  - Mobile fullscreen drawer navigation with body-scroll prevention
  - `prefers-reduced-motion` compliance
  - Dynamic SEO meta titles and descriptions per route

---

## 📁 Project Architecture

```
coffee-cafe/
│
├── client/                             # Frontend (React, Vite, Tailwind CSS, GSAP)
│   ├── public/
│   │   └── favicon.svg                 # Custom coffee bean brand mark
│   ├── src/
│   │   ├── animations/                 # Reusable GSAP & ScrollTrigger utilities
│   │   │   ├── counter.js              # Numerical count-up animations
│   │   │   ├── imageReveal.js          # Masking & scale reveals
│   │   │   ├── menuAnimations.js       # Staggered card filters
│   │   │   ├── pageTransition.js       # Cinematic route transitions
│   │   │   ├── parallax.js             # Pinned sections & parallax scrub
│   │   │   └── textReveal.js           # Line-by-line editorial reveals
│   │   ├── components/                 # Reusable React components
│   │   │   ├── Button.jsx              # Magnetic & luxury variant button
│   │   │   ├── ContactForm.jsx         # Validated form with GSAP success states
│   │   │   ├── CustomCursor.jsx        # Smooth follower cursor
│   │   │   ├── Footer.jsx              # Editorial footer with hours & newsletter
│   │   │   ├── Gallery.jsx             # Asymmetric editorial photo grid
│   │   │   ├── Icons.jsx               # Custom SVG brand icons
│   │   │   ├── LoadingScreen.jsx       # Coffee bean SVG loading screen
│   │   │   ├── MenuCard.jsx            # Product card with zoom & badge tags
│   │   │   ├── MenuFilter.jsx          # Category filter pill selector
│   │   │   ├── MobileMenu.jsx          # Fullscreen mobile drawer navigation
│   │   │   ├── Navbar.jsx              # Glassmorphic scroll-reactive navbar
│   │   │   ├── PageTransition.jsx      # Global route transition wipe
│   │   │   ├── SectionHeading.jsx      # Typography header with badge
│   │   │   ├── StatCounter.jsx         # Numerical statistic card
│   │   │   └── TestimonialCard.jsx     # Guest review card with star rating
│   │   ├── data/
│   │   │   ├── cafeInfo.js             # Centralized business hours & location
│   │   │   ├── fallbackMenu.js         # Offline fallback dataset
│   │   │   ├── testimonials.js         # Guest critique reviews
│   │   │   └── timeline.js             # Milestone archive (2018 - 2026)
│   │   ├── hooks/
│   │   │   ├── useDocumentTitle.js     # SEO page titles & meta descriptions
│   │   │   └── useScrollDirection.js   # Scroll direction & offset detection
│   │   ├── pages/                      # Application route pages
│   │   │   ├── Home.jsx                # 9 rich storytelling sections
│   │   │   ├── Menu.jsx                # MongoDB-driven menu with categories
│   │   │   ├── About.jsx               # Heritage, pillars & animated timeline
│   │   │   ├── Contact.jsx             # Centralized info & reservation form
│   │   │   ├── PrivacyPolicy.jsx       # Complete 12-section privacy policy
│   │   │   ├── TermsConditions.jsx     # Complete 13-section terms & conditions
│   │   │   └── NotFound.jsx            # Creative animated 404 page
│   │   ├── services/
│   │   │   └── api.js                  # Axios client with error handling
│   │   ├── App.jsx                     # Root application wrapper
│   │   ├── index.css                   # Tailwind directives & custom scrollbars
│   │   └── main.jsx                    # Vite React mount entry
│   ├── index.html                      # HTML5 entry with Google Fonts
│   ├── package.json
│   ├── tailwind.config.js              # Custom café color tokens & fonts
│   └── vite.config.js
│
├── server/                             # Backend (Node.js, Express, MongoDB)
│   ├── config/
│   │   └── db.js                       # Mongoose connection handler
│   ├── controllers/
│   │   ├── contactController.js        # Contact message handlers
│   │   └── menuController.js           # Menu query & filtering handlers
│   ├── middleware/
│   │   └── errorMiddleware.js          # 404 & global exception middleware
│   ├── models/
│   │   ├── ContactMessage.js           # Contact message Mongoose schema
│   │   └── Menu.js                     # Menu item Mongoose schema
│   ├── routes/
│   │   ├── contactRoutes.js            # /api/contact endpoints
│   │   └── menuRoutes.js               # /api/menu endpoints
│   ├── seed/
│   │   └── menuData.js                 # 21-item artisan seeder script
│   ├── .env.example
│   ├── package.json
│   └── server.js                       # Express application entry
│
├── .env.example
├── .gitignore
├── package.json                        # Root workspace scripts
└── README.md
```

---

## 🛠️ Technology Stack

### Frontend
- **React.js (v19)** with **Vite** for fast hot module replacement and optimized bundling
- **Tailwind CSS (v3)** with custom theme extensions
- **GSAP (GreenSock) & ScrollTrigger** for cinematic animations
- **React Router DOM (v7)** for SPA route transitions
- **Axios** for REST API communication
- **Lucide React** for minimal iconography

### Backend
- **Node.js** runtime environment
- **Express.js** web framework
- **MongoDB** NoSQL database
- **Mongoose (v8)** Object Data Modeling (ODM)
- **CORS** for cross-origin resource sharing
- **dotenv** for environment configuration
- **Nodemon** for development auto-reloading

---

## ⚙️ Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/coffee-cafe
CLIENT_URL=http://localhost:5173
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Node.js (v18+)**, **npm (v9+)**, and **MongoDB** installed and running on your system.

### 2. Clone & Install Dependencies
From the repository root:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Seed Database
Populate your local MongoDB with artisan coffee, bakery, and tea items:
```bash
cd server
npm run seed
```
Output confirmation:
```
Connecting to MongoDB at: mongodb://127.0.0.1:27017/coffee-cafe
Successfully seeded 21 menu items!
- Featured items: 7
- Categories: Signature, Coffee, Cold Coffee, Tea, Breakfast, Snacks, Desserts
```

### 4. Start Development Servers

**Start Backend Server (Port 5000):**
```bash
cd server
npm run dev
# or: npm start
```

**Start Frontend Server (Port 5173):**
```bash
cd client
npm run dev
```

Visit **`http://localhost:5173`** in your browser to experience the site.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and timestamp |
| `GET` | `/api/menu` | Retrieve all menu items (supports `?category=` and `?featured=true`) |
| `GET` | `/api/menu/:id` | Retrieve a single item by MongoDB ObjectID |
| `GET` | `/api/menu/category/:category` | Retrieve all items belonging to a specific category |
| `POST` | `/api/contact` | Submit a contact or reservation inquiry |
| `GET` | `/api/contact` | Audit list of submitted contact messages |

### Sample Contact Form Payload:
```json
{
  "name": "Maya Lin",
  "email": "maya@example.com",
  "phone": "+1 (415) 555-1234",
  "subject": "Table Reservation",
  "message": "We would love to reserve a quiet table for four this Saturday."
}
```

---

## 🌐 Routes & Pages

- `/` — **Home**: Full-viewport hero, editorial split intro, featured menu carousel, pinned experience track, GSAP animated statistics, philosophy typography, testimonial carousel, asymmetric photo gallery, and final CTA.
- `/menu` — **Specialty Menu**: Live MongoDB fetching, category pills, search bar, vegetarian filter, and item price badges.
- `/about` — **Our Story**: Heritage story, 4 foundational craft pillars, and interactive milestone timeline (2018–2026).
- `/contact` — **Contact & Visit**: Centralized hours, address, Google Maps routing, and active contact form with database persistence.
- `/privacy-policy` — **Privacy Policy**: Comprehensive 12-section compliance policy.
- `/terms-and-conditions` — **Terms & Conditions**: Complete 13-section slow bar hospitality terms.
- `*` — **404 Not Found**: Animated floating coffee cup with quick return button.

---

## 📦 Production Build

To compile an optimized production bundle:
```bash
cd client
npm run build
```
The output will be placed in `client/dist/`.

---

## ☕ License
Developed with pride for **AURELIA Specialty Coffee Roasters & Slow Bar LLC**. Open source under the ISC license.
