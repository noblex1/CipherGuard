# CipherGuard Frontend - Vercel Deployment Guide

Quick guide for deploying the CipherGuard frontend to Vercel.

## 🚀 Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account with CipherGuard repository
- Vercel account (free tier available)
- Backend deployed on Render (get the URL first)

### Step-by-Step Deployment

1. **Go to [Vercel](https://vercel.com/)**
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your `CipherGuard` repository
   - Click "Import"

3. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Root Directory: client/cipherguard
   Build Command: npm run build (default)
   Output Directory: .next (default)
   Install Command: npm install (default)
   Node Version: 18.x or 20.x
   ```

4. **Add Environment Variables**
   
   Click "Environment Variables" section:
   
   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_API_BASE` | `https://your-backend.onrender.com` |
   
   **Important:** Replace with your actual Render backend URL

5. **Deploy**
   - Click "Deploy"
   - Wait 3-5 minutes for build to complete
   - Vercel will provide your URL: `https://your-app.vercel.app`

6. **Update Backend CORS**
   - Go to your Render dashboard
   - Update `CORS_ORIGIN` environment variable with your Vercel URL
   - Redeploy backend

## ✅ Verify Deployment

1. Visit your Vercel URL
2. Test the following pages:
   - Home page loads
   - Encrypt page works
   - Decrypt page works
   - Dashboard displays charts
   - Admin login page accessible

3. Check browser console for errors
4. Verify API calls are successful (Network tab)

## 🔧 Environment Variables Explained

### `NEXT_PUBLIC_API_BASE`
- **Required:** Yes
- **Purpose:** Backend API URL for all API calls
- **Development:** `http://localhost:5000`
- **Production:** `https://your-backend.onrender.com`
- **Note:** Must start with `NEXT_PUBLIC_` to be accessible in browser

## 📝 Common Issues

### Issue: API Calls Failing
**Solution:**
- Verify `NEXT_PUBLIC_API_BASE` is set correctly
- Ensure backend is running (visit `/health` endpoint)
- Check CORS configuration on backend

### Issue: Build Failing
**Solution:**
- Check Vercel deployment logs
- Verify all dependencies are in `package.json`
- Ensure Next.js version is compatible

### Issue: Environment Variables Not Working
**Solution:**
- Redeploy after adding environment variables
- Variable name must start with `NEXT_PUBLIC_`
- Check Vercel Settings → Environment Variables

### Issue: 404 on Refresh
**Solution:**
- This shouldn't happen with Next.js App Router
- Verify `next.config.ts` is properly configured
- Check Vercel routing settings

## 🔄 Updating Your Deployment

### Automatic Deployment
Vercel automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

Vercel will detect the push and redeploy automatically.

### Manual Redeploy
1. Go to Vercel Dashboard
2. Select your project
3. Go to "Deployments"
4. Click "..." menu on latest deployment
5. Click "Redeploy"

## 🌐 Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records:
   - Type: `A` or `CNAME`
   - Name: `@` or `www`
   - Value: Provided by Vercel
4. Wait for DNS propagation (can take up to 48 hours)
5. SSL certificate is automatically provisioned

## 📊 Monitoring

### Vercel Analytics
- Go to Project → Analytics
- View page views, unique visitors, and performance
- Free on all plans

### Error Tracking
- Go to Project → Deployments → View Function Logs
- Monitor runtime errors
- Check build logs for deployment issues

## 🎯 Performance Optimization

Vercel automatically optimizes:
- ✅ Image optimization with Next.js Image component
- ✅ Automatic code splitting
- ✅ Edge caching
- ✅ Global CDN distribution
- ✅ Compression and minification

## 🔒 Security

- ✅ HTTPS enabled by default
- ✅ Environment variables encrypted
- ✅ Automatic security headers
- ✅ DDoS protection

## 💰 Vercel Free Tier Limits

- 100 GB bandwidth per month
- Unlimited deployments
- Unlimited websites
- 100 GB-Hours serverless function execution
- 1,000 GB-Hours Edge Middleware execution

Perfect for development and small projects!

## 📞 Support

If issues persist:
1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review deployment logs in Vercel dashboard
3. Verify environment variables
4. Test backend health endpoint
5. Check browser console for client-side errors

## 🎉 Success!

Your CipherGuard frontend is now live on Vercel!

**Remember to:**
- Share your Vercel URL with testers
- Update README.md with deployment URL
- Monitor analytics and performance
- Keep dependencies updated

---

**Deployment URL:** `https://__________.vercel.app`  
**Backend API:** `https://__________.onrender.com`  
**Deployed on:** __________
