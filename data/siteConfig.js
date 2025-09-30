// 🎯 FinAI LLC - Easy Content Management
// Edit this file to update your website content easily!

export const siteConfig = {
  // Company Information
  company: {
    name: "FinAI LLC",
    tagline: "Intelligent Financial Solutions",
    description: "Leading fintech AI company providing innovative financial technology solutions",
    email: "contact@finai.com",
    phone: "+1 111 222 3333",
    address: "Pittsburgh, PA",
    logo: "/logo.png" // Add your logo here
  },

  // Hero Section
  hero: {
    title: "Transform Your Financial Future with AI",
    subtitle: "Cutting-edge artificial intelligence solutions for modern financial challenges",
    ctaText: "Get Started Today",
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  },

  // Services (Easy to add/remove/edit)
  services: [
    {
      id: 1,
      title: "AI-Powered Portfolio Management",
      description: "Intelligent investment strategies powered by machine learning algorithms",
      icon: "📊",
      features: ["Real-time analysis", "Risk assessment", "Automated rebalancing"]
    },
    {
      id: 2,
      title: "Fraud Detection AI",
      description: "Advanced fraud prevention using neural networks and pattern recognition",
      icon: "🛡️",
      features: ["Real-time monitoring", "Pattern recognition", "Risk scoring"]
    },
    {
      id: 3,
      title: "Financial Chatbot Solutions",
      description: "Intelligent conversational AI for customer service and financial advice",
      icon: "🤖",
      features: ["24/7 availability", "Natural language processing", "Personalized advice"]
    },
    {
      id: 4,
      title: "Credit Risk Assessment",
      description: "AI-driven credit scoring and risk evaluation for lending decisions",
      icon: "📈",
      features: ["Alternative data analysis", "Real-time scoring", "Compliance ready"]
    }
  ],

  // About Section
  about: {
    title: "About FinAI LLC",
    story: "Founded in 2023, FinAI LLC is at the forefront of financial technology innovation. We combine deep expertise in artificial intelligence with comprehensive understanding of financial markets to deliver transformative solutions.",
    mission: "To democratize access to sophisticated financial AI tools and make intelligent financial decision-making accessible to everyone.",
    values: [
      {
        title: "Innovation",
        description: "Pushing the boundaries of what's possible with AI in finance",
        icon: "💡"
      },
      {
        title: "Security",
        description: "Maintaining the highest standards of data protection and privacy",
        icon: "🔒"
      },
      {
        title: "Transparency",
        description: "Building explainable AI that clients can understand and trust",
        icon: "🔍"
      },
      {
        title: "Results",
        description: "Delivering measurable value and ROI for our clients",
        icon: "🎯"
      }
    ]
  },

  // Team Members (Easy to add/remove)
  team: [
    {
      id: 1,
      name: "Sridhar Yerram",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Visionary leader and entrepreneur with expertise in AI, fintech, and full-stack development. Leading FinAI LLC to deliver innovative solutions.",
      linkedin: "https://linkedin.com/in/sridharyerram",
      twitter: "https://twitter.com/sridharyerram"
    }
    // Add more team members here as needed
  ],

  // Portfolio/Case Studies (Easy to add new projects)
  portfolio: [
    {
      id: 1,
      title: "AI Trading Platform",
      description: "Machine learning-powered trading system with 40% improved returns",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["AI", "Trading", "Machine Learning"],
      metrics: {
        roi: "40% improved returns",
        timeline: "6 months",
        impact: "$2M+ managed assets"
      }
    },
    {
      id: 2,
      title: "Fraud Detection System",
      description: "Real-time fraud prevention reducing false positives by 60%",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tags: ["Fraud Detection", "Neural Networks", "Real-time"],
      metrics: {
        roi: "60% reduction in false positives",
        timeline: "4 months",
        impact: "99.8% accuracy rate"
      }
    }
    // Add more projects here
  ],

  // Contact Information
  contact: {
    title: "Let's Build the Future of Finance Together",
    subtitle: "Ready to transform your financial operations with AI? Let's discuss your needs.",
    office: {
      address: "Pittsburgh, PA",
      phone: "+1 111 222 3333",
      email: "contact@finai.com",
      hours: "Mon-Fri: 9AM-6PM EST"
    }
  },

  // Social Media Links
  social: {
    linkedin: "https://linkedin.com/company/finai-llc",
    twitter: "https://twitter.com/finai_llc",
    github: "https://github.com/finai-llc",
    email: "contact@finai.com"
  },

  // Website Settings
  settings: {
    theme: "professional", // professional, modern, creative
    primaryColor: "#3B82F6", // Blue
    secondaryColor: "#1E40AF", // Darker blue
    accentColor: "#F59E0B", // Amber
    analytics: {
      googleAnalytics: "GA_TRACKING_ID", // Add your GA4 ID
      enabled: false
    },
    seo: {
      metaTitle: "FinAI LLC - AI-Powered Financial Solutions",
      metaDescription: "Transform your financial operations with cutting-edge AI solutions. Portfolio management, fraud detection, and intelligent automation.",
      keywords: ["fintech", "AI", "financial technology", "machine learning", "portfolio management", "fraud detection"]
    }
  }
}

export default siteConfig
