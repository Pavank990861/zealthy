# Vercel Environment Variables Check

## Required Environment Variables

Make sure these are set in your Vercel dashboard:

1. **MONGODB_URI**
   - Value: `mongodb+srv://kanchetipavan04_db_user:K.pavan@86199@cluster0.deb3gtk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
   - Description: MongoDB Atlas connection string

2. **MONGODB_DB**
   - Value: `zealthy_onboarding`
   - Description: Database name

3. **NODE_ENV**
   - Value: `production`
   - Description: Environment mode

## How to Add Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project: `zealthy-wine`
3. Go to Settings → Environment Variables
4. Add each variable above
5. Make sure to select "Production" environment
6. Redeploy your application

## MongoDB Atlas Checklist

### Network Access
- [ ] IP Address: `0.0.0.0/0` (allow access from anywhere)
- [ ] Status: Active

### Database Access
- [ ] Username: `kanchetipavan04_db_user`
- [ ] Password: `K.pavan@86199`
- [ ] Role: `Atlas admin` or `Read and write to any database`

### Connection String
- [ ] Format: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
- [ ] No spaces or special characters
- [ ] Password is URL encoded if it contains special characters

## Troubleshooting Steps

1. **Check Vercel Logs**:
   - Go to Vercel dashboard → Functions tab
   - Look for error logs in the API routes

2. **Test MongoDB Connection**:
   - Use MongoDB Compass or similar tool
   - Test connection with the same credentials

3. **Redeploy**:
   - After adding environment variables, redeploy the app
   - Go to Deployments tab → Click "Redeploy"

## Common Issues

- **Authentication failed**: Check username/password
- **Network access denied**: Add IP whitelist
- **Database not found**: Check database name
- **Connection timeout**: Check cluster status
