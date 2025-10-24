#!/bin/bash

# GitHub Pages Demo - Deployment Script
# This script automates the deployment process for the GitHub Pages demo site

set -e

echo "🚀 Starting GitHub Pages Demo Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    print_error "Not in a git repository. Please initialize git first."
    exit 1
fi

# Check if Jekyll is installed
if ! command -v jekyll &> /dev/null; then
    print_warning "Jekyll not found. Installing dependencies..."
    
    # Check if bundle is available
    if command -v bundle &> /dev/null; then
        print_status "Installing Jekyll dependencies..."
        bundle install
    else
        print_error "Bundler not found. Please install Ruby and Bundler first."
        print_status "Visit: https://jekyllrb.com/docs/installation/"
        exit 1
    fi
fi

# Build the site
print_status "Building Jekyll site..."
if bundle exec jekyll build; then
    print_success "Site built successfully!"
else
    print_error "Failed to build site. Check for errors above."
    exit 1
fi

# Check if we have changes to commit
if git diff --quiet && git diff --cached --quiet; then
    print_warning "No changes to commit."
    read -p "Do you want to force push anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Deployment cancelled."
        exit 0
    fi
fi

# Add all changes
print_status "Adding changes to git..."
git add .

# Commit changes
print_status "Committing changes..."
git commit -m "Deploy GitHub Pages demo site - $(date)"

# Push to remote
print_status "Pushing to remote repository..."
if git push origin main; then
    print_success "Successfully pushed to remote!"
else
    print_error "Failed to push to remote. Check your git configuration."
    exit 1
fi

# Check if GitHub Pages is enabled
print_status "Checking GitHub Pages status..."
print_warning "Make sure GitHub Pages is enabled in your repository settings:"
print_warning "1. Go to your repository on GitHub"
print_warning "2. Click on 'Settings'"
print_warning "3. Scroll down to 'Pages' section"
print_warning "4. Select 'Deploy from a branch'"
print_warning "5. Choose 'main' branch and '/ (root)' folder"
print_warning "6. Click 'Save'"

# Display site URL
print_success "Deployment complete!"
print_status "Your site will be available at:"
print_status "https://yourusername.github.io/github-pages-demo"
print_status "(Replace 'yourusername' with your actual GitHub username)"

# Optional: Open in browser
read -p "Would you like to open the site in your browser? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v open &> /dev/null; then
        open "https://yourusername.github.io/github-pages-demo"
    elif command -v xdg-open &> /dev/null; then
        xdg-open "https://yourusername.github.io/github-pages-demo"
    else
        print_warning "Could not open browser automatically. Please visit the URL manually."
    fi
fi

print_success "🎉 GitHub Pages demo site deployed successfully!"
print_status "You can now use Cursor to make changes and they will be automatically deployed."



