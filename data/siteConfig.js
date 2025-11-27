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

  // Stock Portfolio Configuration
  stockPortfolio: {
    enabled: true,
    title: "Live Stock Portfolio",
    subtitle: "Real-time portfolio tracking powered by AI-driven analytics",
    displaySettings: {
      showValues: true, // Allow users to hide/show values
      autoRefresh: true, // Auto-refresh every 30 seconds
      refreshInterval: 30000, // 30 seconds
      defaultTab: "overview" // overview, holdings, sectors
    },
    // Demo holdings - replace with real data or API integration
    holdings: [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        shares: 50,
        purchasePrice: 150.00,
        sector: "Technology"
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        shares: 25,
        purchasePrice: 2500.00,
        sector: "Technology"
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        shares: 40,
        purchasePrice: 300.00,
        sector: "Technology"
      },
      {
        symbol: "TSLA",
        name: "Tesla Inc.",
        shares: 30,
        purchasePrice: 200.00,
        sector: "Automotive"
      },
      {
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        shares: 20,
        purchasePrice: 400.00,
        sector: "Technology"
      },
      {
        symbol: "JPM",
        name: "JPMorgan Chase & Co.",
        shares: 35,
        purchasePrice: 140.00,
        sector: "Financial"
      }
    ],
    // API Configuration (for future real data integration)
    api: {
      provider: "alphavantage", // alphavantage, yahoo, iex
      apiKey: "YOUR_API_KEY_HERE",
      updateInterval: 300000, // 5 minutes for real API calls
      endpoints: {
        quote: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE",
        batch: "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES"
      }
    },
    // Display customization
    ui: {
      theme: "professional", // professional, modern, minimal
      colors: {
        positive: "#10B981", // Green for gains
        negative: "#EF4444", // Red for losses
        neutral: "#6B7280"   // Gray for neutral
      },
      charts: {
        enabled: true,
        type: "line", // line, candlestick, area
        timeframe: "1D" // 1D, 1W, 1M, 3M, 1Y
      }
    }
  },

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
  },

  // Stock Analysis & Ticker Configuration
  stockAnalysis: {
    enabled: true,
    title: "AI-Powered Stock Analysis",
    subtitle: "Advanced stock analysis with machine learning predictions, technical indicators, and options trading insights",
    features: {
      realTimeData: true,
      technicalAnalysis: true,
      aiPredictions: true,
      optionsChain: true,
      sentimentAnalysis: true,
      riskMetrics: true
    },
    // Prediction Models Configuration
    predictions: {
      timeframes: ["nextDay", "nextWeek", "nextMonth"],
      algorithms: ["LSTM", "Technical Analysis", "Sentiment Analysis"],
      confidenceThreshold: 60, // Minimum confidence to show predictions
      updateInterval: 300000 // 5 minutes
    },
    // Technical Indicators
    technicalIndicators: [
      "RSI", "MACD", "Bollinger Bands", "SMA", "EMA", 
      "Stochastic", "Williams %R", "ATR"
    ],
    // Options Trading
    options: {
      enabled: true,
      greeks: ["delta", "gamma", "theta", "vega", "rho"],
      strategies: ["covered_call", "protective_put", "straddle", "strangle"],
      maxExpiration: 365 // days
    },
    // Risk Management
    riskMetrics: {
      var95: true, // Value at Risk 95%
      maxDrawdown: true,
      sharpeRatio: true,
      beta: true,
      volatility: true
    },
    // Data Sources (for future real API integration)
    dataSources: {
      primary: "alphavantage", // alphavantage, polygon, finnhub
      backup: "yahoo",
      newsAPI: "newsapi",
      socialSentiment: "twitter"
    }
  }
}

export default siteConfig
