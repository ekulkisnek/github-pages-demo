---
layout: page
title: "GitHub Pages Tutorials"
permalink: /tutorials/
description: "Step-by-step tutorials for GitHub Pages development"
---

# GitHub Pages Tutorials

Learn how to build and deploy amazing static websites with GitHub Pages.

## 🚀 Quick Start Guide

### 1. Create Your Repository

```bash
# Create a new repository on GitHub
# Clone it locally
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Add Your First Page

Create an `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My GitHub Pages Site</title>
</head>
<body>
    <h1>Hello, GitHub Pages!</h1>
    <p>This is my first static site.</p>
</body>
</html>
```

### 3. Deploy

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

Enable GitHub Pages in your repository settings, and your site will be live at `https://yourusername.github.io/your-repo`!

## 📝 Jekyll Tutorial

### Setting Up Jekyll

1. **Install Jekyll** (optional for local development):
```bash
gem install jekyll bundler
```

2. **Create Jekyll site**:
```bash
jekyll new my-site
cd my-site
```

3. **Configure Jekyll** in `_config.yml`:
```yaml
title: "My Awesome Site"
description: "A Jekyll-powered GitHub Pages site"
baseurl: "" # Leave empty for user/organization pages
url: "" # Leave empty for user/organization pages

# Build settings
markdown: kramdown
highlighter: rouge
theme: minima

# Plugins
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
```

### Jekyll Features

<div class="tutorial-section">
  <h3>Posts</h3>
  <p>Create blog posts in the `_posts` directory:</p>
  
  <div class="code-block">
    <div class="filename">_posts/2024-01-15-my-first-post.md</div>
    <pre><code>---
layout: post
title: "My First Post"
date: 2024-01-15 10:30:00 -0000
categories: jekyll update
---

# My First Post

This is my first blog post using Jekyll!
</code></pre>
  </div>
</div>

<div class="tutorial-section">
  <h3>Pages</h3>
  <p>Create static pages with front matter:</p>
  
  <div class="code-block">
    <div class="filename">about.md</div>
    <pre><code>---
layout: page
title: "About"
permalink: /about/
---

# About Me

This is my about page.
</code></pre>
  </div>
</div>

<div class="tutorial-section">
  <h3>Collections</h3>
  <p>Organize content with custom collections:</p>
  
  <div class="code-block">
    <div class="filename">_config.yml</div>
    <pre><code>collections:
  tutorials:
    output: true
    permalink: /:collection/:name/
</code></pre>
  </div>
</div>

## 🎨 Styling Tutorial

### CSS Custom Properties

```css
:root {
  --primary-color: #007acc;
  --secondary-color: #6c757d;
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body {
  font-family: var(--font-family);
  color: var(--primary-color);
}
```

### Responsive Design

```css
/* Mobile First Approach */
.container {
  padding: 1rem;
  max-width: 100%;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }
}
```

### CSS Grid Layout

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.grid-item {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
```

## ⚡ JavaScript Tutorial

### Interactive Components

```javascript
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}
```

### Form Handling

```javascript
// Contact form
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  // Validate form
  if (!data.email || !data.message) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  // Simulate form submission
  showNotification('Message sent successfully!', 'success');
  this.reset();
});
```

## 🔧 GitHub Actions Tutorial

### Automated Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: '3.1'
        
    - name: Setup Jekyll
      run: |
        gem install jekyll bundler
        bundle install
        
    - name: Build site
      run: bundle exec jekyll build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site
```

### Custom Build Process

```yaml
name: Custom Build

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build assets
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 📱 Mobile Optimization

### Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Touch-Friendly Buttons

```css
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
```

### Progressive Web App

```html
<!-- manifest.json -->
{
  "name": "My GitHub Pages Site",
  "short_name": "MySite",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#007acc"
}
```

## 🔍 SEO Optimization

### Meta Tags

```html
<head>
  <title>My Site - Page Title</title>
  <meta name="description" content="Page description for search engines">
  <meta name="keywords" content="keyword1, keyword2, keyword3">
  
  <!-- Open Graph -->
  <meta property="og:title" content="My Site - Page Title">
  <meta property="og:description" content="Page description">
  <meta property="og:image" content="/images/og-image.jpg">
  <meta property="og:url" content="https://yoursite.github.io">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="My Site - Page Title">
  <meta name="twitter:description" content="Page description">
</head>
```

### Structured Data

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "My GitHub Pages Site",
  "url": "https://yoursite.github.io",
  "description": "A showcase of GitHub Pages features"
}
</script>
```

## 🚀 Performance Optimization

### Image Optimization

```html
<!-- Responsive images -->
<img src="image-small.jpg" 
     srcset="image-small.jpg 480w, image-large.jpg 800w"
     sizes="(max-width: 480px) 100vw, 50vw"
     alt="Description">

<!-- Lazy loading -->
<img src="placeholder.jpg" 
     data-src="actual-image.jpg" 
     loading="lazy" 
     alt="Description">
```

### CSS Optimization

```css
/* Critical CSS inline */
/* Non-critical CSS loaded asynchronously */
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### JavaScript Optimization

```javascript
// Load scripts asynchronously
const script = document.createElement('script');
script.src = 'script.js';
script.async = true;
document.head.appendChild(script);
```

## 📊 Analytics Integration

### Google Analytics

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### GitHub Analytics

```html
<!-- GitHub Analytics -->
<script async defer src="https://analytics.github.com/analytics.js"></script>
```

## 🛠️ Development Tools

### Local Development

```bash
# Install Jekyll
gem install jekyll bundler

# Create new site
jekyll new my-site
cd my-site

# Serve locally
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

### VS Code Extensions

- **Jekyll Snippets** - Code snippets for Jekyll
- **Liquid** - Syntax highlighting for Liquid templates
- **Live Server** - Local development server
- **Prettier** - Code formatting

## 📚 Additional Resources

<div class="resources-grid">
  <div class="resource-card">
    <h4>📖 Documentation</h4>
    <ul>
      <li><a href="https://docs.github.com/en/pages">GitHub Pages Docs</a></li>
      <li><a href="https://jekyllrb.com/docs/">Jekyll Documentation</a></li>
      <li><a href="https://pages.github.com/">GitHub Pages Guide</a></li>
    </ul>
  </div>
  
  <div class="resource-card">
    <h4>🎨 Themes</h4>
    <ul>
      <li><a href="https://jekyllthemes.io/">Jekyll Themes</a></li>
      <li><a href="https://github.com/topics/jekyll-theme">GitHub Themes</a></li>
      <li><a href="https://jamstackthemes.dev/">JAMstack Themes</a></li>
    </ul>
  </div>
  
  <div class="resource-card">
    <h4>🛠️ Tools</h4>
    <ul>
      <li><a href="https://github.com/peaceiris/actions-gh-pages">GitHub Actions</a></li>
      <li><a href="https://www.netlify.com/">Netlify</a></li>
      <li><a href="https://vercel.com/">Vercel</a></li>
    </ul>
  </div>
</div>

## 🎯 Next Steps

1. **Choose a theme** that fits your needs
2. **Customize the design** with your branding
3. **Add content** using Markdown or HTML
4. **Optimize for performance** and SEO
5. **Set up analytics** to track visitors
6. **Deploy and share** your site!

<div class="cta-section">
  <h3>Ready to Build?</h3>
  <p>Start creating your GitHub Pages site today!</p>
  <a href="https://github.com/new" class="btn btn-primary" target="_blank">Create Repository</a>
  <a href="{{ '/features/' | relative_url }}" class="btn btn-secondary">Explore Features</a>
</div>

<style>
.tutorial-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007acc;
}

.code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem 0;
}

.filename {
  background: #2d2d30;
  padding: 0.5rem 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #cccccc;
  border-bottom: 1px solid #3e3e42;
}

.code-block pre {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.resource-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e1e5e9;
}

.resource-card h4 {
  color: #007acc;
  margin-bottom: 1rem;
}

.resource-card ul {
  list-style: none;
  padding: 0;
}

.resource-card li {
  margin-bottom: 0.5rem;
}

.resource-card a {
  color: #007acc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.resource-card a:hover {
  color: #005a9e;
  text-decoration: underline;
}

.cta-section {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #007acc, #005a9e);
  color: white;
  border-radius: 8px;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .resources-grid {
    grid-template-columns: 1fr;
  }
  
  .code-block {
    font-size: 0.8rem;
  }
}
</style>



