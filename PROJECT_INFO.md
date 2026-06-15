# CipherGuard - Enhanced Caesar Cipher Security Platform

## Project Overview
**Title:** Enhanced Caesar Cipher with Dynamic Key, Multi-Round Encryption, and Automated Cryptanalysis Tool

**Type:** Final Year Computer Science Project (2026)

**Description:** A comprehensive, modern, frontend-only web application that demonstrates enhanced Caesar cipher encryption with dynamic key generation, multi-round encryption, and automated cryptanalysis capabilities.

## Tech Stack

### Core Technologies
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components

### Libraries & Tools
- **Recharts** - Data visualization and charts
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Modern icon library
- **Class Variance Authority** - Component variants
- **Tailwind Merge** - Utility class merging

## Features

### 1. Landing Page (`/`)
- Hero section with project overview
- Features showcase
- How it works section
- Security benefits breakdown
- Call-to-action sections
- Animated cyber-themed illustrations

### 2. Encryption Module (`/encrypt`)
- Plaintext input textarea
- Keyword input for dynamic key generation
- Cipher type selector (Classical vs Enhanced)
- Encryption rounds selector (1-5)
- Real-time encryption with mock implementation
- Display generated dynamic keys
- Encryption summary with key space calculation
- Copy-to-clipboard functionality

### 3. Decryption Module (`/decrypt`)
- Ciphertext input textarea
- Keyword input
- Cipher type and rounds configuration
- Real-time decryption with mock implementation
- Success/failure indicators
- Process summary display
- Helpful tips and instructions

### 4. Cryptanalysis Module (`/cryptanalysis`)
Three analysis methods in tabbed interface:

#### Brute Force Analysis
- Attack progress tracking
- Estimated time calculation
- Candidate plaintexts display
- Success probability indicators
- Progress visualization charts

#### Frequency Analysis
- Letter frequency distribution charts
- Comparison with expected English frequency
- Most frequent letters analysis
- Correlation score metrics
- Interactive bar charts

#### Chi-Square Analysis
- Chi-square score calculation
- Ranked plaintext candidates
- Probability indicators
- Best match highlighting
- Detailed scoring table

### 5. Security Comparison Dashboard (`/dashboard`)
- Key metrics cards (Key Space, Break Time, etc.)
- Security score comparison charts
- Attack trends visualization
- Multi-dimensional radar charts
- Detailed benchmark results table
- Classical vs Enhanced comparison
- Security recommendations
- Performance indicators

### 6. Educational Platform (`/learn`)
Four interactive learning modules:

#### Basics
- What is Caesar Cipher?
- Classical vs Enhanced comparison
- Multi-round encryption introduction

#### Caesar Demo
- Character shifting animation
- Step-by-step visualization
- Interactive demonstrations

#### Key Generation
- Dynamic key generation walkthrough
- Keyword to number conversion
- Multi-round key application

#### Multi-Round
- Layer-by-layer encryption demonstration
- Visual round progression
- Security benefits explanation

### 7. Reports Page (`/reports`)
- Security benchmark reports
- Comparison tables
- Recent encryption history
- Attack simulation results
- Security findings summary
- Export buttons (PDF/CSV - UI only)
- Critical/warning/info alerts

### 8. Admin Dashboard (`/admin`)
- System statistics overview
- Usage trends charts
- Cipher usage distribution
- Recent encryption logs
- Attack history table
- Benchmark records
- Performance metrics
- Real-time monitoring interface

## Design Features

### Color Palette
- **Primary:** Blue (#3b82f6)
- **Secondary:** Cyan (#06b6d4)
- **Accent:** Purple (#8b5cf6)
- **Dark Navy:** For dark mode backgrounds
- **White:** For light mode backgrounds

### Visual Design
- **Glassmorphism** effects on cards
- **Gradient backgrounds** for visual appeal
- **Cyber grid patterns** for tech aesthetic
- **Smooth animations** with Framer Motion
- **Responsive layouts** for all devices
- **Clean typography** with Inter font
- **Professional spacing** and alignment

### UX Features
- Sticky navigation bar
- Smooth page transitions
- Interactive hover effects
- Loading states and progress indicators
- Success/error feedback
- Accessible components
- Mobile-responsive design
- Dark mode support

## Mock Data
All functionality uses realistic mock data including:
- Encryption/Decryption history
- Attack simulation results
- Benchmark test results
- Frequency analysis data
- Chi-square candidates
- Usage statistics
- Performance metrics

## Project Structure

```
cipherguard/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── encrypt/
│   │   └── page.tsx         # Encryption module
│   ├── decrypt/
│   │   └── page.tsx         # Decryption module
│   ├── cryptanalysis/
│   │   └── page.tsx         # Cryptanalysis tools
│   ├── dashboard/
│   │   └── page.tsx         # Security dashboard
│   ├── learn/
│   │   └── page.tsx         # Educational platform
│   ├── reports/
│   │   └── page.tsx         # Reports and findings
│   └── admin/
│       └── page.tsx         # Admin dashboard
├── components/
│   ├── Navbar.tsx           # Navigation component
│   ├── Footer.tsx           # Footer component
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── utils.ts             # Utility functions
│   └── mockData.ts          # Mock data for demos
└── public/                  # Static assets
```

## Running the Project

### Development
```bash
cd cipherguard
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## Key Features Highlights

### Security Analysis
- **Key Space Comparison:** Classical (26) vs Enhanced (308M+)
- **Break Time:** Classical (<1s) vs Enhanced (7+ hours)
- **Attack Resistance:** Classical (0%) vs Enhanced (95%)
- **Chi-Square Distance:** Classical (45.2) vs Enhanced (892.7)

### Educational Value
- Interactive demonstrations
- Step-by-step walkthroughs
- Visual learning aids
- Real-time feedback
- Comprehensive explanations

### Professional Quality
- Modern SaaS-style UI
- Premium animations
- Comprehensive analytics
- Detailed reporting
- Executive dashboard

## Important Notes

### Frontend Only
This is a **frontend-only** application with:
- No backend server
- No database
- No API endpoints
- No authentication
- No user registration
- Mock data for all operations

### Mock Implementation
All encryption, decryption, and cryptanalysis operations use **mock implementations** for demonstration purposes. This is an educational project showing the UI/UX of such a system.

### Academic Purpose
This project is designed for **academic evaluation** as a final-year Computer Science project, demonstrating:
- Modern web development skills
- UI/UX design capabilities
- Data visualization
- Complex application architecture
- Professional-grade interfaces

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Credits
**Project:** CipherGuard - Enhanced Caesar Cipher Security Platform  
**Year:** 2026  
**Purpose:** Final Year Computer Science Project  
**Type:** Frontend-only demonstration application

## License
Academic project - All rights reserved

---

Built with ❤️ using Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui
