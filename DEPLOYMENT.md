# 🚀 CipherGuard Deployment Guide

Complete guide for deploying CipherGuard to production using **Vercel** (Frontend) and **Render** (Backend).

## 📋 Prerequisites

Before deploying, ensure you have:

- [x] GitHub account
- [x] Vercel account (free tier available)
- [x] Render account (free tier available)
- [x] MongoDB Atlas account (free tier available)
- [x] All code pushed to your GitHub repository

## Part 1: Backend Deployment (Render)

### Step 1: Set Up MongoDB Atlas

1. **Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**
2. **Create a free cluster**
   - Choose a cloud provider (AWS recommended)
   - Select the region closest to your users
   - Use M0 (Free tier)
3. **Configure Network Access**
   - Click "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
4. **Create Database User**
   - Click "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (save these!)
   - Set "Read and write to any database" role
   - Click "Add User"
5. **Get Connection String**
   - Click "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database>` with `cipherguard`
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cipherguard?retryWrites=true&w=majority`

### Step 2: Deploy Backend to Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" → "Web Service"**
3. **Connect Your GitHub Repository**
   - Authorize Render to access your GitHub
   - Select the `CipherGuard` repository
4. **Configure Web Service**
   ```
   Name: cipherguard-api
   Region: Choose closest to your users (e.g., Oregon)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   Instance Type: Free
   ```
5. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:
   
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://your-connection-string
   JWT_SECRET=generate-a-random-32-character-string
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=YourSecurePassword123!
   CORS_ORIGIN=https://your-app-name.vercel.app
   RATE_LIMIT_WINDOW_MS=60000
   RATE_LIMIT_MAX=120
   LOG_LEVEL=info
   ```
   
   **Important**: 
   - Generate a secure JWT_SECRET: `openssl rand -base64 32`
   - Use a strong ADMIN_PASSWORD
   - CORS_ORIGIN will be updated after Vercel deployment

6. **Create Web Service**
   - Click "Create Web Service"
   - Wait for the deployment to complete (5-10 minutes)
   - Copy your Render URL (e.g., `https://cipherguard-api.onrender.com`)

7. **Test Backend**
   Visit: `https://your-app.onrender.com/health`
   
   Expected response:
   ```json
   {
     "status": "ok",
     "timestamp": "2026-01-15T10:30:00.000Z",
     "uptime": 123.456
   }
   ```

### Step 3: Create Admin User

1. **Go to Render Dashboard** → Your Service
2. **Click "Shell" tab** (on the right side)
3. **Run the admin creation script:**
   ```bash
   npm run create-admin
   ```
4. **Verify** the admin user was created successfully

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New..." → "Project"**
3. **Import Your GitHub Repository**
   - Search for `CipherGuard`
   - Click "Import"
4. **Configure Project**
   ```
   Framework Preset: Next.js
   Root Directory: client/cipherguard
   Build Command: npm run build (or leave default)
   Output Directory: .next (or leave default)
   Install Command: npm install (or leave default)
   ```
5. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   Name: NEXT_PUBLIC_API_BASE
   Value: https://your-app.onrender.com
   ```
   
   Replace `your-app.onrender.com` with your actual Render backend URL (from Part 1, Step 2)
   
6. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (3-5 minutes)
   - Vercel will provide a URL like: `https://cipherguard-xyz.vercel.app`

### Step 2: Update Backend CORS

1. **Go back to Render Dashboard**
2. **Select your Web Service**
3. **Go to "Environment" tab**
4. **Update CORS_ORIGIN** with your Vercel URL:
   ```
   CORS_ORIGIN=https://your-app.vercel.app
   ```
5. **Click "Save Changes"**
6. **Service will automatically redeploy**

### Step 3: Test Your Deployment

1. **Visit your Vercel URL**: `https://your-app.vercel.app`
2. **Test Encryption**:
   - Go to Encrypt page
   - Enter text and keyword
   - Click "Encrypt"
   - Verify the encrypted output appears
3. **Test Dashboard**:
   - Navigate to Dashboard
   - Verify charts and metrics load
4. **Test Admin Login**:
   - Go to Admin page
   - Login with your credentials
   - Verify dashboard data loads

---

## 🔒 Post-Deployment Security Checklist

### Backend (Render)
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Strong database user password set
- [ ] JWT_SECRET is random and secure (32+ characters)
- [ ] ADMIN_PASSWORD changed from default
- [ ] CORS_ORIGIN set to your Vercel domain only
- [ ] Rate limiting enabled
- [ ] Environment variables secured

### Frontend (Vercel)
- [ ] NEXT_PUBLIC_API_BASE points to correct Render URL
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled (automatic on Vercel)

---

## 🔧 Troubleshooting

### Backend Issues

**Problem: "Cannot connect to database"**
- Verify MongoDB Atlas connection string is correct
- Ensure IP whitelist includes 0.0.0.0/0 or Render's IPs
- Check database user credentials

**Problem: "Health check failing"**
- Check Render logs: Dashboard → Service → Logs
- Verify build completed successfully
- Ensure PORT=5000 in environment variables

**Problem: "CORS errors in browser"**
- Update CORS_ORIGIN in Render to match your Vercel URL
- Ensure no trailing slash in URLs
- Check browser console for exact error

### Frontend Issues

**Problem: "API calls failing"**
- Verify NEXT_PUBLIC_API_BASE is set correctly
- Check Network tab in browser DevTools
- Ensure backend is running (visit /health endpoint)

**Problem: "Build failing on Vercel"**
- Check Vercel deployment logs
- Verify all dependencies in package.json
- Ensure Next.js version compatibility

**Problem: "Environment variables not working"**
- Redeploy after adding environment variables
- Verify variable names start with NEXT_PUBLIC_
- Check Vercel Settings → Environment Variables

---

## 🔄 Updating Your Deployment

### Update Backend
```bash
# Make changes to server code
git add .
git commit -m "Update backend"
git push origin main
```
Render will automatically redeploy.

### Update Frontend
```bash
# Make changes to client code
git add .
git commit -m "Update frontend"
git push origin main
```
Vercel will automatically redeploy.

### Manual Redeploy
- **Render**: Dashboard → Service → Manual Deploy → "Deploy latest commit"
- **Vercel**: Dashboard → Project → Deployments → "Redeploy"

---

## 📊 Monitoring

### Render
- View logs: Dashboard → Service → Logs
- Monitor performance: Dashboard → Service → Metrics
- Check health: Visit `https://your-app.onrender.com/health`

### Vercel
- View deployment logs: Dashboard → Project → Deployments
- Analytics: Dashboard → Project → Analytics
- Monitor uptime: Dashboard → Project → Settings → Monitoring

---

## 💰 Free Tier Limitations

### Render (Free)
- Service spins down after 15 minutes of inactivity
- First request after inactivity may take 30-60 seconds (cold start)
- 750 hours/month of runtime
- 512 MB RAM

**Solution**: Consider upgrading to paid tier for production use, or implement a keep-alive ping.

### Vercel (Free)
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless function execution limits

### MongoDB Atlas (Free - M0)
- 512 MB storage
- Shared RAM
- No backups
- Sufficient for development and small projects

---

## 🌐 Custom Domain (Optional)

### For Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### For Render
1. Go to Service Settings → Custom Domain
2. Add your custom domain
3. Update DNS records as instructed
4. Update CORS_ORIGIN in environment variables

---

## 📝 Environment Variables Reference

### Backend (Render)
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| NODE_ENV | Yes | Environment mode | `production` |
| PORT | Yes | Server port | `5000` |
| MONGODB_URI | Yes | MongoDB connection | `mongodb+srv://...` |
| JWT_SECRET | Yes | JWT signing key | Random 32+ chars |
| ADMIN_USERNAME | Yes | Admin username | `admin` |
| ADMIN_PASSWORD | Yes | Admin password | Strong password |
| CORS_ORIGIN | Yes | Allowed origins | `https://app.vercel.app` |
| RATE_LIMIT_WINDOW_MS | No | Rate limit window | `60000` |
| RATE_LIMIT_MAX | No | Max requests | `120` |
| LOG_LEVEL | No | Logging level | `info` |

### Frontend (Vercel)
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| NEXT_PUBLIC_API_BASE | Yes | Backend API URL | `https://api.onrender.com` |

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Backend deployed to Render
- [ ] Admin user created on backend
- [ ] Backend health check passing
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured correctly
- [ ] CORS updated with Vercel URL
- [ ] Encryption/decryption tested
- [ ] Dashboard loading properly
- [ ] Admin login working
- [ ] API calls successful

---

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Render/Vercel deployment logs
3. Verify all environment variables
4. Test backend health endpoint
5. Check browser console for errors

---

**🎉 Congratulations! Your CipherGuard application is now live!**

**URLs to Save:**
- Backend API: `https://your-app.onrender.com`
- Frontend App: `https://your-app.vercel.app`
- Health Check: `https://your-app.onrender.com/health`

Remember to update these URLs in your documentation and share them as needed.
