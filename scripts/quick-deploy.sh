#!/bin/bash

# 🚀 FinAI LLC - Quick Deploy Script
# Makes it easy to update and deploy your website

echo "🎯 FinAI LLC - Quick Deploy Tool"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to ask for commit message
get_commit_message() {
    echo ""
    echo "📝 What changes did you make? (or press Enter for default message)"
    read -r commit_message
    
    if [ -z "$commit_message" ]; then
        commit_message="Update: Website content and configuration"
    fi
}

# Main menu
echo ""
echo "What would you like to do?"
echo "1. 🔍 Test locally (npm run dev)"
echo "2. 🏗️  Build and test"
echo "3. 🚀 Deploy to production"
echo "4. 📊 Check deployment status"
echo "5. ❌ Exit"
echo ""
read -p "Choose an option (1-5): " choice

case $choice in
    1)
        echo "🔍 Starting local development server..."
        echo "Open http://localhost:3000 in your browser"
        echo "Press Ctrl+C to stop"
        npm run dev
        ;;
    2)
        echo "🏗️ Building the project..."
        npm run build
        if [ $? -eq 0 ]; then
            echo "✅ Build successful! Your site is ready for deployment."
        else
            echo "❌ Build failed. Please check the errors above."
            exit 1
        fi
        ;;
    3)
        echo "🚀 Deploying to production..."
        
        # Check for uncommitted changes
        if [ -n "$(git status --porcelain)" ]; then
            echo "📝 You have uncommitted changes. Let's commit them first."
            
            get_commit_message
            
            echo "📦 Adding files..."
            git add .
            
            echo "💾 Committing changes..."
            git commit -m "$commit_message"
            
            if [ $? -ne 0 ]; then
                echo "❌ Commit failed. Please check for errors."
                exit 1
            fi
        else
            echo "✅ No new changes to commit."
        fi
        
        echo "🌐 Pushing to GitHub..."
        git push origin main
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 SUCCESS! Your website is being deployed!"
            echo ""
            echo "📍 Your website will be live at:"
            echo "   https://sryerram2025-boop.github.io/finai-llc-website/"
            echo ""
            echo "⏱️  Deployment usually takes 2-5 minutes."
            echo "🔍 Check status: https://github.com/sryerram2025-boop/finai-llc-website/actions"
        else
            echo "❌ Push failed. Please check your internet connection and try again."
            exit 1
        fi
        ;;
    4)
        echo "📊 Opening deployment status page..."
        open "https://github.com/sryerram2025-boop/finai-llc-website/actions"
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid option. Please choose 1-5."
        exit 1
        ;;
esac
