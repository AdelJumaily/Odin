#!/bin/bash

# Deploy Odin to Vercel
# This script helps deploy the cloud dashboard to Vercel

set -e

echo "🚀 Deploying Odin to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel:"
    vercel login
fi

# Set environment variables
echo "📝 Setting up environment variables..."

# Database configuration
vercel env add DATABASE_HOST
vercel env add DATABASE_PORT
vercel env add DATABASE_NAME
vercel env add DATABASE_USER
vercel env add DATABASE_PASSWORD
vercel env add DATABASE_SSL

# Application settings
vercel env add NODE_ENV production
vercel env add NEXT_TELEMETRY_DISABLED 1

# Optional: Storage configuration
echo "💾 Optional: Set up file storage (S3/MinIO)? (y/n)"
read -r setup_storage
if [[ $setup_storage == "y" || $setup_storage == "Y" ]]; then
    vercel env add STORAGE_PROVIDER
    vercel env add STORAGE_ENDPOINT
    vercel env add STORAGE_BUCKET
    vercel env add STORAGE_ACCESS_KEY
    vercel env add STORAGE_SECRET_KEY
    vercel env add STORAGE_REGION
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app is now live at: https://your-app-name.vercel.app"
echo "📊 Check the Vercel dashboard for deployment details"
