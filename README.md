# CipherGuard — Backend + Frontend Integration

This repository contains the CipherGuard frontend and the Node.js/Express backend.

Quick setup

1. Install dependencies

```bash
cd server
npm install
cd ../client/cipherguard
npm install
```

2. Configure environment

Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`, `JWT_SECRET`, and admin credentials.

3. Create initial admin

```bash
cd server
npm run create-admin
```

4. Run in development

```bash
cd server
npm run dev
```

Server API endpoints
- `POST /api/encrypt`
- `POST /api/decrypt`
- `POST /api/cryptanalysis/bruteforce`
- `POST /api/cryptanalysis/frequency`
- `POST /api/cryptanalysis/chisquare`
- `GET /api/analytics`
- Admin routes (JWT protected): `POST /api/admin/login`, `GET /api/admin/dashboard`, etc.

Testing

Run unit tests from the `server` folder:

```bash
cd server
npm test
```
