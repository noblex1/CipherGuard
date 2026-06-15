# 📋 CipherGuard Deployment Checklist

Quick reference checklist for deploying CipherGuard to production.

## Pre-Deployment

- [ ] Code tested locally
- [ ] All environment variables documented
- [ ] Database backup strategy planned
- [ ] Latest code pushed to GitHub

---

## MongoDB Atlas Setup

- [ ] Free cluster created
- [ ] Network access: Allow 0.0.0.0/0
- [ ] Database user created with strong password
- [ ] Connection string copied and password replaced
- [ ] Database name set to `cipherguard`

**Connection String Format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cipherguard?retryWrites=true&w=majority
```

---

## Backend Deployment (Render)

- [ ] New Web Service created on Render
- [ ] Repository connected
- [ ] Root directory set to `server`
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] Environment variables added:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000`
  - [ ] `MONGODB_URI=<your-connection-string>`
  - [ ] `JWT_SECRET=<random-32-char-string>`
  - [ ] `ADMIN_USERNAME=admin`
  - [ ] `ADMIN_PASSWORD=<secure-password>`
  - [ ] `CORS_ORIGIN=<will-update-after-vercel>`
  - [ ] `RATE_LIMIT_WINDOW_MS=60000`
  - [ ] `RATE_LIMIT_MAX=120`
- [ ] Service deployed successfully
- [ ] Health check passing: `/health`
- [ ] Admin user created via Shell: `npm run create-admin`
- [ ] Backend URL noted: `https://__________.onrender.com`

---

## Frontend Deployment (Vercel)

- [ ] New Project created on Vercel
- [ ] Repository imported
- [ ] Root directory set to `client/cipherguard`
- [ ] Framework preset: Next.js
- [ ] Environment variable added:
  - [ ] `NEXT_PUBLIC_API_BASE=<render-backend-url>`
- [ ] Deployed successfully
- [ ] Frontend URL noted: `https://__________.vercel.app`

---

## Post-Deployment Configuration

- [ ] CORS_ORIGIN updated in Render with Vercel URL
- [ ] Backend redeployed after CORS update
- [ ] Both services restarted and running

---

## Testing

- [ ] Frontend loads without errors
- [ ] Home page displays correctly
- [ ] Encrypt page works
  - [ ] Can input text and keyword
  - [ ] Encryption generates ciphertext
  - [ ] Dynamic keys displayed
- [ ] Decrypt page works
  - [ ] Can input ciphertext and keyword
  - [ ] Decryption recovers plaintext
- [ ] Cryptanalysis page works
  - [ ] Brute force analysis runs
  - [ ] Frequency analysis displays charts
  - [ ] Chi-square test completes
- [ ] Dashboard loads with data
  - [ ] Charts render correctly
  - [ ] Metrics display properly
- [ ] Admin login works
  - [ ] Can log in with credentials
  - [ ] Dashboard shows admin data
- [ ] API connectivity verified
  - [ ] No CORS errors in console
  - [ ] All API calls successful

---

## Security Verification

- [ ] JWT_SECRET is random and strong (32+ characters)
- [ ] ADMIN_PASSWORD changed from default
- [ ] MongoDB user has strong password
- [ ] CORS_ORIGIN restricted to Vercel domain only
- [ ] Rate limiting enabled
- [ ] HTTPS enabled on both services (automatic)
- [ ] No sensitive data in logs

---

## Documentation

- [ ] README.md updated with deployment URLs
- [ ] Environment variables documented
- [ ] Access credentials saved securely
- [ ] Deployment date recorded

---

## URLs for Reference

**Backend API:** `https://__________.onrender.com`  
**Frontend App:** `https://__________.vercel.app`  
**Health Check:** `https://__________.onrender.com/health`  
**MongoDB:** `cluster0.xxxxx.mongodb.net`

---

## Credentials to Save Securely

**MongoDB Atlas:**
- Username: __________
- Password: __________
- Connection String: __________

**Admin Panel:**
- Username: __________
- Password: __________

**JWT Secret:** __________

---

## Monitoring Setup

- [ ] Render service metrics enabled
- [ ] Vercel analytics enabled
- [ ] Error logging configured
- [ ] Uptime monitoring set up (optional)

---

## Optional Enhancements

- [ ] Custom domain configured
- [ ] SSL certificate verified
- [ ] CDN configured for assets
- [ ] Database backups scheduled
- [ ] Monitoring alerts set up
- [ ] Performance optimization applied

---

## Troubleshooting Completed

If any issues occurred:
- [ ] Database connection verified
- [ ] CORS configuration checked
- [ ] Environment variables verified
- [ ] Build logs reviewed
- [ ] API endpoints tested individually

---

**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Deployment Date:** __________  
**Deployed By:** __________  
**Version:** 1.0.0

---

## Quick Commands

### Test Backend Health
```bash
curl https://your-app.onrender.com/health
```

### Test Encryption Endpoint
```bash
curl -X POST https://your-app.onrender.com/api/encrypt \
  -H "Content-Type: application/json" \
  -d '{"text":"HELLO","keyword":"SECRET","rounds":3,"cipherType":"enhanced"}'
```

### View Backend Logs
```bash
# In Render Dashboard → Service → Logs
```

### Redeploy Backend
```bash
# In Render Dashboard → Service → Manual Deploy
```

### Redeploy Frontend
```bash
# In Vercel Dashboard → Project → Deployments → Redeploy
```

---

## Notes

_Add any deployment-specific notes, issues encountered, or special configurations here:_

---

**🎉 Deployment Complete!**
