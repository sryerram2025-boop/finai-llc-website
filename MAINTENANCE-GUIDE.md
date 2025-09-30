# 🛠️ FinAI LLC Website - Maintenance Guide

## 🎯 Quick Content Updates

### ✅ What You Can Update Easily (No Code Knowledge Required)

**📝 Edit `data/siteConfig.js` for:**
- Company information (name, contact, address)
- Services and their descriptions
- Team member profiles
- Portfolio projects
- About section content
- Social media links

### 🚀 How to Update Content

1. **Open the project in Cursor/VS Code**
2. **Edit `data/siteConfig.js`**
3. **Save the file**
4. **Test locally**: `npm run dev`
5. **Deploy**: Git commit + push (auto-deploys to GitHub Pages)

---

## 📋 Common Tasks

### ➕ Adding a New Service

```javascript
// In data/siteConfig.js, add to services array:
{
  id: 5, // Next available ID
  title: "Your New Service",
  description: "Description of what this service does",
  icon: "🔥", // Pick an emoji
  features: ["Feature 1", "Feature 2", "Feature 3"]
}
```

### 👤 Adding a Team Member

```javascript
// In data/siteConfig.js, add to team array:
{
  id: 2, // Next available ID
  name: "John Doe",
  role: "Senior AI Engineer",
  image: "https://images.unsplash.com/photo-1...", // Unsplash image URL
  bio: "Expert in machine learning and financial algorithms",
  linkedin: "https://linkedin.com/in/johndoe",
  twitter: "https://twitter.com/johndoe"
}
```

### 📊 Adding a Portfolio Project

```javascript
// In data/siteConfig.js, add to portfolio array:
{
  id: 3, // Next available ID
  title: "Project Name",
  description: "What the project accomplished",
  image: "https://images.unsplash.com/photo-1...",
  tags: ["AI", "Fintech", "Blockchain"],
  metrics: {
    roi: "Results achieved",
    timeline: "Time taken",
    impact: "Business impact"
  }
}
```

---

## 🔧 Development Workflow

### 🏁 Getting Started
```bash
# Navigate to project
cd /Users/sridharyerram/IdeaProjects/finai-llc-website

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### 📝 Making Changes
1. **Edit content** in `data/siteConfig.js`
2. **Test locally** with `npm run dev`
3. **Commit changes**: `git add . && git commit -m "Update: describe your changes"`
4. **Deploy**: `git push origin main`
5. **Wait 2-3 minutes** for automatic deployment

### 🚀 Deployment Process
- **Automatic**: Every push to `main` branch triggers deployment
- **Live URL**: https://sryerram2025-boop.github.io/finai-llc-website/
- **Status**: Check GitHub Actions tab for deployment status

---

## 📂 Project Structure

```
finai-llc-website/
├── data/
│   └── siteConfig.js          # 🎯 MAIN CONTENT FILE - Edit this!
├── components/
│   ├── Hero.tsx              # Homepage hero section
│   ├── Services.tsx          # Services section
│   ├── About.tsx             # About section
│   ├── Portfolio.tsx         # Portfolio/projects
│   ├── Contact.tsx           # Contact form
│   └── ...
├── app/
│   ├── page.tsx              # Main homepage
│   └── layout.tsx            # Site layout
├── .github/workflows/
│   └── deploy.yml            # Auto-deployment config
└── package.json              # Dependencies
```

---

## 🔍 Troubleshooting

### ❌ Build Fails
1. Check for syntax errors in `siteConfig.js`
2. Ensure all arrays end with commas
3. Check GitHub Actions tab for detailed error logs

### 🐛 Website Not Updating
1. Check if your changes were committed: `git status`
2. Check if push was successful: `git log --oneline -5`
3. Check GitHub Actions for deployment status
4. Wait 5-10 minutes for CDN cache to clear

### 💻 Local Development Issues
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

---

## 🎨 Design Customization

### 🎨 Colors
Edit `data/siteConfig.js` → `settings` → colors:
```javascript
settings: {
  primaryColor: "#3B82F6",    // Main brand color
  secondaryColor: "#1E40AF",  // Secondary brand color
  accentColor: "#F59E0B"      // Accent/highlight color
}
```

### 📱 Images
- **Company logo**: Add to `/public/logo.png`
- **Team photos**: Use Unsplash URLs or upload to `/public/team/`
- **Portfolio images**: Use Unsplash URLs for consistency

---

## 📈 Analytics & Monitoring

### 📊 Google Analytics
1. Create Google Analytics 4 property
2. Add tracking ID to `siteConfig.js`:
```javascript
analytics: {
  googleAnalytics: "G-XXXXXXXXXX",
  enabled: true
}
```

### 🔍 SEO
Update meta information in `siteConfig.js` → `settings` → `seo`

---

## 🆘 Emergency Contacts

- **Technical Issues**: Reach out to your development team
- **Hosting Issues**: GitHub Pages (usually 99.9% uptime)
- **Domain Issues**: Your domain registrar

---

## 📅 Maintenance Schedule

### 🔄 Weekly
- [ ] Update portfolio with new projects
- [ ] Check for any broken links
- [ ] Review analytics data

### 📊 Monthly  
- [ ] Update team information
- [ ] Add new blog posts (if blog is added)
- [ ] Review and update service descriptions
- [ ] Check competitor websites for inspiration

### 🔧 Quarterly
- [ ] Update dependencies: `npm update`
- [ ] Review website performance
- [ ] Plan new features or sections
- [ ] Backup important content

---

**🎉 You're all set! This system is designed to grow with your business while keeping maintenance simple and sustainable.**
