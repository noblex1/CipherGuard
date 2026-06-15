# CipherGuard Backend API

Node.js/Express backend for CipherGuard Enhanced Caesar Cipher platform.

## 🚀 Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and secrets
   ```

3. **Start MongoDB** (if using local)
   ```bash
   # macOS/Linux
   mongod
   
   # Windows
   # Start MongoDB service from Services
   ```

4. **Create admin user**
   ```bash
   npm run create-admin
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

Server runs on `http://localhost:5000`

### Production Build

```bash
npm run build
npm start
```

## 📡 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/encrypt` | Encrypt plaintext |
| POST | `/api/decrypt` | Decrypt ciphertext |
| POST | `/api/cryptanalysis/bruteforce` | Brute force attack |
| POST | `/api/cryptanalysis/frequency` | Frequency analysis |
| POST | `/api/cryptanalysis/chisquare` | Chi-square test |
| GET | `/api/analytics` | Get security analytics |
| GET | `/api/benchmark` | Get benchmark results |

### Protected Endpoints (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/dashboard` | Dashboard data |
| GET | `/api/admin/logs` | Activity logs |
| GET | `/api/admin/stats` | Usage statistics |

## 🔧 Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cipherguard
JWT_SECRET=your-secret-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure-password
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=120
```

## 📦 Project Structure

```
server/
├── src/
│   ├── algorithms/       # Encryption algorithms
│   ├── controllers/      # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── config/          # Configuration
│   ├── utils/           # Utilities
│   ├── scripts/         # Admin scripts
│   └── server.ts        # Entry point
├── tests/               # Unit tests
└── dist/                # Compiled output
```

## 🧪 Testing

```bash
npm test
```

## 🚀 Deployment to Render

See [DEPLOYMENT.md](../DEPLOYMENT.md) for complete deployment guide.

**Quick Steps:**
1. Create Web Service on Render
2. Connect GitHub repository
3. Set root directory to `server`
4. Configure environment variables
5. Deploy

**Build Command:** `npm install && npm run build`  
**Start Command:** `npm start`

## 🔒 Security

- JWT authentication for admin routes
- Rate limiting on all endpoints
- CORS configuration
- Input validation
- Helmet security headers
- MongoDB injection prevention

## 📊 Monitoring

- Health check endpoint: `/health`
- Logging with Winston
- Error handling middleware

## 🛠️ Scripts

- `npm run dev` - Development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run create-admin` - Create admin user
- `npm test` - Run tests
- `npm run lint` - Lint code

## 📝 License

Academic project - All rights reserved
