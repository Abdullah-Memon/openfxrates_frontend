#!/bin/bash

# Navigate to project folder
# cd /home/ec2-user/DEV/frontend_application || exit

echo "📥 Pulling latest code..."
git pull origin dev

echo "📦 Installing dependencies..."
npm install --only=production

echo "🏗️ Building Next.js app..."
npm run build

echo "🔄 Restarting PM2 process..."
pm2 restart frontend

echo "💾 Saving PM2 state..."
pm2 save

echo "✅ Deployment completed successfully!"
