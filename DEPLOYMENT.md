# 🚀 Quick Deployment Guide

## Prerequisites
- Install Node.js from https://nodejs.org (if not already installed)
- Create a GitHub account (if deploying via GitHub)
- Create a Vercel account at https://vercel.com (free)

## Step 1: Setup Project Locally

1. Open Terminal/Command Prompt

2. Navigate to the project folder:
```bash
cd path/to/jordan-portfolio
```

3. Install dependencies:
```bash
npm install
```

4. Test locally (optional but recommended):
```bash
npm run dev
```
Visit http://localhost:3000 to see your site

## Step 2: Deploy to Vercel (Choose ONE method)

### 🎯 EASIEST: Vercel CLI Method

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Answer the prompts:
   - Set up and deploy? → **Y**
   - Which scope? → **Select your account**
   - Link to existing project? → **N**
   - What's your project's name? → **jordan-toia-portfolio**
   - In which directory is your code? → **./**
   - Want to override settings? → **N**

5. For production deployment:
```bash
vercel --prod
```

Your site is now live! 🎉

### 📦 Alternative: GitHub + Vercel Method

1. Create a new repository on GitHub

2. Initialize git and push:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

3. Go to https://vercel.com/new

4. Click "Import Project"

5. Import your GitHub repository

6. Vercel will auto-configure everything

7. Click "Deploy"

Done! Your site is live! 🎉

## Step 3: Add Custom Domain (Optional)

1. Go to your Vercel dashboard

2. Select your project

3. Go to "Settings" → "Domains"

4. Add your domain (e.g., jordantoia.com)

5. Update your domain's DNS settings as instructed by Vercel

## Updating Your Site

Whenever you want to update your site:

**If using Vercel CLI:**
```bash
vercel --prod
```

**If using GitHub:**
Just push to your repository:
```bash
git add .
git commit -m "Update description"
git push
```
Vercel will automatically deploy!

## Troubleshooting

**Build fails?**
- Make sure Node.js 18+ is installed
- Delete `node_modules` and `.next` folders
- Run `npm install` again

**Videos not loading?**
- Check that Vimeo links are correct
- Ensure Vimeo videos are set to "Public"

**Need help?**
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs

## What You Get

✅ Lightning-fast website
✅ Automatic HTTPS
✅ Global CDN
✅ Free hosting on Vercel
✅ Automatic deployments
✅ Professional domain support
