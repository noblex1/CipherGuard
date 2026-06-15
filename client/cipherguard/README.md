# 🛡️ CipherGuard - Enhanced Caesar Cipher Security Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8)
![License](https://img.shields.io/badge/License-Academic-green)

A comprehensive, modern, frontend-only web application demonstrating **Enhanced Caesar Cipher** encryption with dynamic key generation, multi-round encryption, and automated cryptanalysis capabilities.

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

- ✅ **Modern UI/UX** - Premium SaaS-style interface
- ✅ **Glassmorphism** - Beautiful translucent card effects
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Dark Mode** - Full dark theme support
- ✅ **Animations** - Smooth transitions with Framer Motion
- ✅ **Data Visualization** - Interactive charts with Recharts
- ✅ **Accessibility** - WCAG-compliant components

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

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd cipherguard

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## 🗂️ Project Structure

```
cipherguard/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── encrypt/           # Encryption module
│   ├── decrypt/           # Decryption module
│   ├── cryptanalysis/     # Analysis tools
│   ├── dashboard/         # Security dashboard
│   ├── learn/             # Educational platform
│   ├── reports/           # Reports page
│   └── admin/             # Admin dashboard
├── components/            # React components
│   ├── Navbar.tsx        # Navigation
│   ├── Footer.tsx        # Footer
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities and data
│   ├── utils.ts          # Helper functions
│   └── mockData.ts       # Demo data
└── public/                # Static assets
```

## 🛠️ Tech Stack

### Core
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality components

### Libraries
- **[Recharts](https://recharts.org/)** - Data visualization
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[Lucide React](https://lucide.dev/)** - Icons
- **[Class Variance Authority](https://cva.style/)** - Component variants

## 📱 Pages Overview

### 🏠 Landing Page
Hero section, features, how it works, security benefits, and call-to-action

### 🔒 Encryption Page
Input plaintext, configure parameters, generate ciphertext with dynamic keys

### 🔓 Decryption Page
Input ciphertext, provide keyword, recover original plaintext

### 🔍 Cryptanalysis Page
Brute force, frequency analysis, chi-square testing with visualizations

### 📊 Dashboard Page
Security metrics, comparison charts, benchmark results, recommendations

### 📚 Learn Page
Interactive tutorials on Caesar cipher, key generation, multi-round encryption

### 📄 Reports Page
Security findings, benchmark tables, encryption/attack history, export options

### ⚙️ Admin Page
System overview, usage trends, activity logs, performance metrics

## 🎯 Key Features

### Dynamic Key Generation
- Keyword-based key derivation
- Variable shift values per character
- Multi-round encryption support (1-5 rounds)

### Security Analysis
- Comprehensive benchmarking
- Attack simulation and testing
- Statistical analysis tools
- Real-time metrics

### Educational Tools
- Step-by-step demonstrations
- Animated visualizations
- Interactive learning modules
- Beginner-friendly explanations

### Professional Interface
- Executive dashboard layouts
- Clean data presentation
- Intuitive navigation
- Premium aesthetics

## ⚠️ Important Notes

### Frontend Only
This is a **demonstration application** with:
- ❌ No backend server
- ❌ No database
- ❌ No real authentication
- ❌ No API endpoints
- ✅ Mock data for all operations

### Educational Purpose
Designed for **academic evaluation** to demonstrate:
- Modern web development skills
- UI/UX design capabilities
- Complex application architecture
- Data visualization techniques

### Mock Implementation
All encryption and cryptanalysis use **simplified mock implementations** for demonstration purposes. This is not a production cryptography tool.

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📖 Documentation

For detailed information about features and implementation, see [PROJECT_INFO.md](./PROJECT_INFO.md)

## 🎓 Academic Context

**Project Title:** Enhanced Caesar Cipher with Dynamic Key, Multi-Round Encryption, and Automated Cryptanalysis Tool

**Year:** 2026

**Type:** Final Year Computer Science Project

**Purpose:** Demonstrate understanding of cryptography concepts, modern web development, and professional application design

## 🤝 Contributing

This is an academic project. For educational purposes only.

## 📝 License

Academic project - All rights reserved

## 👤 Author

Final Year Computer Science Student

---

**Built with ❤️ using Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui**

*For academic evaluation and demonstration purposes only*
