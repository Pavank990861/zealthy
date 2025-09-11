#!/bin/bash

echo "🚀 Setting up Zealthy Onboarding App for deployment..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://kanchetipavan04_db_user:K.pavan@86199@cluster0.deb3gtk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# Database Name
MONGODB_DB=zealthy_onboarding

# Next.js Environment
NODE_ENV=development
EOF
    echo "✅ .env.local created successfully!"
else
    echo "✅ .env.local already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

echo "🎉 Setup complete! Your app is ready for deployment."
echo ""
echo "Next steps:"
echo "1. Create a GitHub repository at https://github.com/new"
echo "2. Push your code: git push -u origin main"
echo "3. Deploy to Vercel: https://vercel.com/new"
echo ""
echo "For detailed instructions, see DEPLOYMENT_GUIDE.md"
