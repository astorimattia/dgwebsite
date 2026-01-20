# Production Analytics Error Fix Guide

## Problem
Getting "Failed to fetch analytics" error (500) in production when accessing the admin dashboard.

## Root Cause
The environment variables `REDIS_URL` and `ADMIN_PASSWORD` are not set in the Vercel production environment.

## Solution

### Step 1: Set Environment Variables in Vercel

You need to add the following environment variables to your Vercel project:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (`dgwebsite`)
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

#### REDIS_URL
- **Key**: `REDIS_URL`
- **Value**: `redis://:wedf34HDBIADWAIUwdb2q0@redis-19525.c14.us-east-1-2.ec2.cloud.redislabs.com:19525`
- **Environment**: Select all (Production, Preview, Development)

#### ADMIN_PASSWORD
- **Key**: `ADMIN_PASSWORD`
- **Value**: `p0ll0b4n4n4`
- **Environment**: Select all (Production, Preview, Development)

### Step 2: Redeploy

After adding the environment variables, you need to trigger a new deployment:

**Option A: Via Vercel Dashboard**
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click the three dots menu (⋯)
4. Select **Redeploy**

**Option B: Via Git Push**
```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push
```

**Option C: Via Vercel CLI** (if installed)
```bash
vercel --prod
```

### Step 3: Verify

After redeployment:
1. Go to https://www.mattiaastori.com/admin/login
2. Enter password: `p0ll0b4n4n4`
3. The analytics dashboard should now load successfully

## What Was Fixed

1. **Enhanced Redis Connection Handling**
   - Added connection verification before queries
   - Added better error logging
   - Added automatic reconnection logic

2. **Better Error Messages**
   - Detailed logging to help diagnose issues
   - Environment variable validation
   - Connection status tracking

3. **Diagnostic Tools**
   - Created `scripts/test-redis-connection.js` to test Redis locally

## Testing Locally

To verify everything works locally:

```bash
# Test Redis connection
node --env-file=.env.local scripts/test-redis-connection.js

# Run dev server
npm run dev

# Visit http://localhost:3000/admin/login
```

## Troubleshooting

If you still get errors after setting environment variables:

1. **Check Vercel Logs**
   - Go to Vercel Dashboard → Deployments → Click on deployment → View Function Logs
   - Look for "Analytics API error:" messages

2. **Verify Environment Variables**
   - In Vercel Dashboard → Settings → Environment Variables
   - Make sure both `REDIS_URL` and `ADMIN_PASSWORD` are set for Production

3. **Check Redis Connection**
   - Verify your Redis instance is accessible from the internet
   - Check if there are any IP restrictions in Redis Cloud

4. **Common Issues**
   - **401 Unauthorized**: Password is incorrect or not set
   - **500 Internal Server Error**: Redis connection failed or env vars not set
   - **Timeout**: Redis instance might be down or network issues

## Security Note

⚠️ **IMPORTANT**: The credentials in this guide are from your `.env.local` file. If this is a production system, you should:

1. Rotate the Redis password
2. Use a stronger admin password
3. Consider using Vercel's secret management
4. Never commit `.env.local` to git (it's already in `.gitignore`)
