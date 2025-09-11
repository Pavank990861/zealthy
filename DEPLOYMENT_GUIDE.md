# Deployment Guide for Zealthy Onboarding App

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in with your credentials:
   - Username: `pavankancheti1997@gmail.com`
   - Password: `K.pavan@86199`

2. Click the "+" icon in the top right corner and select "New repository"

3. Fill in the repository details:
   - Repository name: `zealthy-onboarding`
   - Description: `Full-stack onboarding flow application with MongoDB Atlas integration`
   - Make it Public (for free GitHub Pages deployment)
   - Don't initialize with README (we already have one)

4. Click "Create repository"

## Step 2: Push Code to GitHub

Run these commands in your terminal (from the zealthy-onboarding directory):

```bash
# Add the GitHub repository as remote origin
git remote add origin https://github.com/pavankancheti1997/zealthy-onboarding.git

# Push the code to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign in or create an account
3. Create a new cluster (free tier is fine)
4. Create a database user:
   - Username: `kanchetipavan04_db_user`
   - Password: `K.pavan@86199` (or your preferred password)
5. Whitelist IP addresses:
   - Add `0.0.0.0/0` to allow access from anywhere (for deployment)
6. Get your connection string and replace `<db_password>` with your actual password

## Step 4: Deploy to Vercel (Recommended)

### Option A: Deploy via Vercel Dashboard

1. Go to [Vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your `zealthy-onboarding` repository
5. Add environment variables:
   - `MONGODB_URI`: `mongodb+srv://kanchetipavan04_db_user:K.pavan@86199@cluster0.deb3gtk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
   - `MONGODB_DB`: `zealthy_onboarding`
   - `NODE_ENV`: `production`
6. Click "Deploy"

### Option B: Deploy via GitHub Pages

1. Go to your GitHub repository settings
2. Scroll down to "Pages" section
3. Under "Source", select "GitHub Actions"
4. The workflow file `.github/workflows/deploy.yml` will automatically deploy your app
5. Add repository secrets:
   - Go to Settings > Secrets and variables > Actions
   - Add these secrets:
     - `MONGODB_URI`: Your MongoDB connection string
     - `MONGODB_DB`: `zealthy_onboarding`

## Step 5: Environment Variables Setup

### For Local Development
Create a `.env.local` file in your project root:

```bash
MONGODB_URI=mongodb+srv://kanchetipavan04_db_user:K.pavan%4086199@cluster0.deb3gtk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DB=zealthy_onboarding
NODE_ENV=development
```

### For Production (Vercel)
Add these environment variables in your Vercel dashboard:
   - `MONGODB_URI`: `mongodb+srv://kanchetipavan04_db_user:K.pavan%4086199@cluster0.deb3gtk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
- `MONGODB_DB`: `zealthy_onboarding`
- `NODE_ENV`: `production`

## Step 6: Test Your Deployment

1. **Local Testing**:
   ```bash
   npm install
   npm run dev
   ```
   Visit `http://localhost:3000`

2. **Production Testing**:
   - Visit your Vercel URL or GitHub Pages URL
   - Test the onboarding flow
   - Check the admin panel at `/admin`
   - View data at `/data`

## Step 7: Application URLs

After deployment, you'll have access to:
- **Main App**: `https://your-app-name.vercel.app/`
- **Admin Panel**: `https://your-app-name.vercel.app/admin`
- **Data Table**: `https://your-app-name.vercel.app/data`

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**:
   - Check your connection string
   - Ensure IP is whitelisted
   - Verify database user permissions

2. **Build Errors**:
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors with `npm run build`

3. **Environment Variables**:
   - Ensure all required environment variables are set
   - Check variable names match exactly

### Support:
- Check the application logs in Vercel dashboard
- Review MongoDB Atlas logs for connection issues
- Test locally first before deploying

## Security Notes

- Never commit `.env.local` files to Git
- Use strong passwords for MongoDB Atlas
- Regularly rotate database credentials
- Monitor your MongoDB Atlas usage to avoid charges

## Next Steps

1. Set up custom domain (optional)
2. Configure monitoring and analytics
3. Set up automated backups
4. Implement user authentication (if needed)
5. Add more features as required

Your app is now ready for production use with MongoDB Atlas cloud database!
