# 🛡️ CipherGuard - Enhanced Caesar Cipher Security Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)
![License](https://img.shields.io/badge/License-Academic-green)

A comprehensive full-stack web application demonstrating **Enhanced Caesar Cipher** encryption with dynamic key generation, multi-round encryption, and automated cryptanalysis capabilities.

> **Final Year Computer Science Project (2026)**

## ✨ Features

### 🔐 Core Modules

1. **Encryption Module** - Secure your plaintext with enhanced Caesar cipher
2. **Decryption Module** - Recover original plaintext with correct parameters
3. **Cryptanalysis Suite** - Test security with multiple attack methods
4. **Security Dashboard** - Comprehensive analytics and comparisons
5. **Educational Platform** - Interactive learning with visualizations
6. **Reports System** - Detailed security assessments and findings
7. **Admin Dashboard** - System monitoring and activity tracking

### 🎨 Design Highlights

- ✅ **Professional UI/UX** - Formal, sophisticated design with navy/burgundy color scheme
- ✅ **Glassmorphism** - Refined translucent card effects
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Dark Mode** - Full dark theme support with professional aesthetics
- ✅ **Animations** - Subtle, professional transitions with Framer Motion
- ✅ **Data Visualization** - Interactive charts with Recharts
- ✅ **Accessibility** - WCAG AA-compliant components

### 🔬 Cryptanalysis Methods

- **Brute Force Analysis** - Exhaustive key search with progress tracking
- **Frequency Analysis** - Statistical letter distribution analysis
- **Chi-Square Testing** - Pattern matching for English text

### 📊 Security Metrics

| Metric | Classical Caesar | Enhanced Caesar |
|--------|-----------------|-----------------|
| Key Space | 26 | 308,915,776+ |
| Break Time | < 1 second | 7+ hours |
| Attack Resistance | 0% | 95% |
| Chi-Square Distance | 45.2 | 892.7 |

## 🚀 Quick Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/noblex1/CipherGuard.git
cd CipherGuard
```

2. **Install backend dependencies**
```bash
cd server
npm install
```

3. **Install frontend dependencies**
```bash
cd ../client/cipherguard
npm install
```

4. **Configure environment**

Copy `server/.env.example` to `server/.env` and configure:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
PORT=5000
```

5. **Create initial admin user**
```bash
cd server
npm run create-admin
```

6. **Run development servers**

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client/cipherguard
npm run dev
```

The backend runs on `http://localhost:5000` and frontend on `http://localhost:3000`

### Build for Production

**Backend:**
```bash
cd server
npm run build
npm start
```

**Frontend:**
```bash
cd client/cipherguard
npm run build
npm start
```

## 🗂️ Project Structure

```
CipherGuard/
├── server/                 # Backend (Node.js/Express/MongoDB)
│   ├── src/
│   │   ├── algorithms/    # Encryption/cryptanalysis logic
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Database schemas
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth & error handling
│   │   └── server.ts      # Entry point
│   ├── tests/             # Unit tests
│   └── package.json
│
└── client/cipherguard/    # Frontend (Next.js 15)
    ├── app/               # Next.js app directory
    │   ├── page.tsx       # Landing page
    │   ├── encrypt/       # Encryption module
    │   ├── decrypt/       # Decryption module
    │   ├── cryptanalysis/ # Analysis tools
    │   ├── dashboard/     # Security dashboard
    │   ├── learn/         # Educational platform
    │   ├── reports/       # Reports page
    │   └── admin/         # Admin dashboard
    ├── components/        # React components
    │   ├── Navbar.tsx     # Navigation
    │   ├── Sidebar.tsx    # Sidebar navigation
    │   └── ui/            # shadcn/ui components
    ├── lib/               # Utilities
    │   ├── api.ts         # API client
    │   └── utils.ts       # Helper functions
    └── public/            # Static assets
```

## 🌐 API Endpoints

### Public Endpoints
- `POST /api/encrypt` - Encrypt plaintext
- `POST /api/decrypt` - Decrypt ciphertext
- `POST /api/cryptanalysis/bruteforce` - Brute force attack
- `POST /api/cryptanalysis/frequency` - Frequency analysis
- `POST /api/cryptanalysis/chisquare` - Chi-square test
- `GET /api/analytics` - Get security analytics
- `GET /api/benchmark` - Get benchmark results

### Protected Endpoints (JWT Required)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/logs` - System activity logs
- `GET /api/admin/stats` - Usage statistics

## 🛠️ Tech Stack

### Backend
- **[Node.js](https://nodejs.org/)** - Runtime environment
- **[Express.js](https://expressjs.com/)** - Web framework
- **[MongoDB](https://www.mongodb.com/)** - Database
- **[Mongoose](https://mongoosejs.com/)** - ODM
- **[JWT](https://jwt.io/)** - Authentication
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Professional UI components

### Libraries
- **[Recharts](https://recharts.org/)** - Data visualization
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[Lucide React](https://lucide.dev/)** - Icons
- **[Axios](https://axios-http.com/)** - HTTP client

## 📱 Pages Overview

### 🏠 Landing Page
Hero section, features showcase, security benefits, and professional CTAs

### 🔒 Encryption Page
Input plaintext, configure parameters, generate ciphertext with dynamic keys

### 🔓 Decryption Page
Input ciphertext, provide keyword, recover original plaintext

### 🔍 Cryptanalysis Page
Brute force, frequency analysis, chi-square testing with visualizations

### 📊 Dashboard Page
Security metrics, comparison charts, benchmark results, recommendations

### 📚 Learn Page
Interactive tutorials on Caesar cipher concepts and implementation

### 📄 Reports Page
Security findings, benchmark tables, encryption history, export options

### ⚙️ Admin Page
System overview, usage trends, activity logs, performance metrics (Protected)

## 🎯 Key Features

### Dynamic Key Generation
- Keyword-based key derivation
- Variable shift values per character
- Multi-round encryption support (1-5 rounds)

### Security Analysis
- Comprehensive benchmarking
- Attack simulation and testing
- Statistical analysis tools
- Real-time metrics and logging

### Educational Tools
- Step-by-step demonstrations
- Animated visualizations
- Interactive learning modules
- Beginner-friendly explanations

### Professional Interface
- Sophisticated navy/burgundy color scheme
- Executive dashboard layouts
- Clean, formal data presentation
- Enterprise-grade aesthetics

## 🧪 Testing

Run unit tests from the server folder:

```bash
cd server
npm test
```

## 🔒 Security Notes

### Authentication
- JWT-based authentication for admin routes
- Secure password hashing with bcrypt
- Token expiration and refresh

### Data Protection
- Environment variables for sensitive data
- Input validation and sanitization
- MongoDB injection prevention
- Rate limiting on API endpoints

### Best Practices
- Proper error handling
- Logging and monitoring
- CORS configuration
- Security headers

## ⚠️ Important Notes

### Educational Purpose
Designed for **academic evaluation** to demonstrate:
- Full-stack web development skills
- Professional UI/UX design capabilities
- Complex application architecture
- Cryptographic algorithm implementation
- Data visualization and analytics
- System security best practices

### Production Considerations
While this project demonstrates real backend integration, the Caesar cipher (even enhanced) is **not suitable for production cryptography**. This is an educational demonstration of cryptographic concepts.

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📖 Documentation

For detailed information:
- [PROJECT_INFO.md](./client/cipherguard/PROJECT_INFO.md) - Complete feature documentation
- [DEPLOYMENT_GUIDE.md](./client/cipherguard/DEPLOYMENT_GUIDE.md) - Deployment instructions
- [UI_REFACTOR_SUMMARY.md](./client/cipherguard/UI_REFACTOR_SUMMARY.md) - Design system details
- [QUICKSTART.md](./client/cipherguard/QUICKSTART.md) - Quick start guide

## 🎓 Academic Context

**Project Title:** Enhanced Caesar Cipher with Dynamic Key, Multi-Round Encryption, and Automated Cryptanalysis Tool

**Year:** 2026

**Type:** Final Year Computer Science Project

**Purpose:** Demonstrate understanding of:
- Cryptography concepts and implementation
- Full-stack web development
- Professional application design
- Security best practices
- Modern development tools and frameworks

## 🤝 Contributing

This is an academic project. For educational purposes only.

## 📝 License

Academic project - All rights reserved

## 👤 Author

Final Year Computer Science Student - noblex1

---

**Built with ❤️ using Next.js 15, Node.js, Express, MongoDB, TypeScript, and Tailwind CSS**

*For academic evaluation and demonstration purposes only*
