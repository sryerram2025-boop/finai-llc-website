# 🏦 FinAI LLC - Official Website

A modern, AI-focused fintech company website built with Next.js, TypeScript, and Tailwind CSS. Features smooth animations with Framer Motion and a professional design showcasing AI financial solutions.

## 🚀 Quick Start

```bash
# Start development
npm run dev

# Quick deployment
npm run deploy

# Quick update (for small changes)
npm run quick-update

# Check status
npm run status
```

## 📝 Easy Content Updates

**Main content file**: `data/siteConfig.js`

Edit this file to update:
- Company information
- Services and features  
- Team members
- Portfolio projects
- Contact details

## 🌐 Live Website

**Production**: https://sryerram2025-boop.github.io/finai-llc-website/

## 📚 Documentation

- **Full maintenance guide**: `MAINTENANCE-GUIDE.md`
- **Quick deploy script**: `scripts/quick-deploy.sh`

## 🛠️ Sustainable Workflow

1. **Edit content** in `data/siteConfig.js`
2. **Test locally**: `npm run dev` 
3. **Deploy**: `npm run deploy` or `npm run quick-update`
4. **Monitor**: Automatic deployment via GitHub Actions

## 💡 Built for Growth

This website is designed to scale with your business:
- ✅ Easy content management
- ✅ Automatic deployments  
- ✅ Mobile responsive
- ✅ SEO optimized
- ✅ Performance focused
tyoescript
## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices and screen sizes
- **Performance Optimized**: Built with Next.js for optimal performance
- **TypeScript**: Type-safe code for better development experience
- **Animations**: Smooth animations using Framer Motion
- **SEO Friendly**: Optimized for search engines
- **Contact Form**: Functional contact form with validation

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Images**: Next.js Image component with Unsplash

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cursor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
cursor/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── About.tsx            # About section
│   ├── Contact.tsx          # Contact form and info
│   ├── Footer.tsx           # Footer component
│   ├── Hero.tsx             # Hero section
│   ├── Navbar.tsx           # Navigation component
│   ├── Portfolio.tsx        # Portfolio showcase
│   └── Services.tsx         # Services section
├── public/                  # Static assets
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Customization

### Colors
The project uses a custom color palette defined in `tailwind.config.js`. You can modify the colors by updating the theme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        // ... add more shades
      },
      secondary: {
        500: '#10b981',
        600: '#059669',
      }
    }
  }
}
```

### Content
Update the content in each component file:
- **Hero Section**: Edit `components/Hero.tsx`
- **Services**: Modify the services array in `components/Services.tsx`
- **Portfolio**: Update the projects array in `components/Portfolio.tsx`
- **About**: Change team and company info in `components/About.tsx`
- **Contact**: Update contact information in `components/Contact.tsx`

### Images
Replace the Unsplash placeholder images with your own:
1. Add your images to the `public/` folder
2. Update the image paths in the components
3. Or continue using Unsplash by updating the URLs

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance Features

- **Next.js Image Optimization**: Automatic image optimization and lazy loading
- **Code Splitting**: Automatic code splitting for optimal loading
- **SEO Optimization**: Meta tags and structured data
- **Core Web Vitals**: Optimized for Google's Core Web Vitals

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for any environment variables:
```bash
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### SEO
Update the metadata in `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'FinAI LLC - Professional Services',
  description: 'Your company description',
  // ... other metadata
}
```

## 📞 Contact Form

The contact form includes:
- Form validation
- Loading states
- Success/error handling
- Responsive design

To connect to a backend service, update the form submission logic in `components/Contact.tsx`.

## 🌟 Features to Add

Consider adding these features to enhance the landing page:
- Blog section
- Client testimonials
- Case studies
- Multi-language support
- Dark mode toggle
- Analytics integration
- Live chat widget

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you need help with this project, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

Built with ❤️ using Next.js and Tailwind CSS
