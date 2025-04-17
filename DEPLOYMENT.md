# Deployment Guide for StrikeDen

This guide outlines the steps required to deploy StrikeDen securely to Vercel from a public GitHub repository.

## Pre-Deployment Security Checklist

### 1. Environment Variables
- [ ] Ensure `.env.local` is in your `.gitignore` file
- [ ] NEVER commit actual credentials to the repository
- [ ] Create all required environment variables in Vercel dashboard:
  - `MONGO_URI` / `MONGODB_URI` - MongoDB connection string
  - `JWT_SECRET` - Generate a strong random string (32+ characters)
  - `ADMIN_USERNAME` - Admin account username
  - `ADMIN_PASSWORD` - Strong admin password
  - `ADMIN_RECOVERY_KEY` - Admin recovery key
  - `NEXT_PUBLIC_SITE_URL` - Your production domain
  - `ALLOWED_ORIGINS` - Comma-separated list of allowed origins for CORS

### 2. Database Security
- [ ] Create a dedicated MongoDB user with limited permissions
- [ ] Enable IP whitelisting on your MongoDB database
- [ ] Use a strong, unique password for the database user
- [ ] Enable MongoDB Atlas or similar security features if available

### 3. Code Security
- [ ] Verify no hardcoded credentials or secrets in the codebase
- [ ] Ensure all API endpoints are properly secured
- [ ] Check that proper error handling is in place
- [ ] Verify proper input validation on all forms

## Vercel Deployment Steps

1. Push your code to GitHub (without sensitive files):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. Connect your GitHub repository to Vercel:
   - Log in to Vercel and click "New Project"
   - Import your GitHub repository
   - Configure the project settings:
     - Build Command: `npm run build`
     - Output Directory: `.next`
     - Install Command: `npm install`

3. Set up environment variables in Vercel:
   - Go to your project settings
   - Navigate to the "Environment Variables" section
   - Add all required variables from the checklist above

4. Deploy the project:
   - Click "Deploy" and wait for the build to complete

5. Initialize the admin account:
   - Visit `https://your-domain.com/api/init` once
   - Save the recovery key displayed (it will only be shown once)

## Post-Deployment Steps

1. **Test authentication:**
   - Verify admin login works at `/admin/login`
   - Test the admin dashboard functionality

2. **Security verification:**
   - Check HTTP security headers are working (use [Security Headers](https://securityheaders.com/))
   - Verify CORS is working correctly
   - Ensure all API endpoints require proper authentication

3. **Documentation for the gym owner:**
   - Provide the gym owner with login credentials
   - Document the recovery process if they forget their password
   - Provide basic instructions on using the admin dashboard

## Emergency Procedures

If you need to restore access:

1. **Using recovery key:**
   - Go to the login page
   - Click "Forgot Password?"
   - Enter the admin username and recovery key

2. **If recovery key is lost:**
   - Access the MongoDB database directly
   - Delete the admin account
   - Redeploy the application
   - Visit the initialization endpoint again to create a new admin account 