// Advanced Stock Analysis Service with AI Predictions
// Comprehensive financial analysis, technical indicators, and ML-based predictions

export interface TechnicalIndicators {
  rsi: number
  macd: {
    macd: number
    signal: number
    histogram: number
  }
  bollingerBands: {
    upper: number
    middle: number
    lower: number
  }
  sma20: number
  sma50: number
  ema12: number
  ema26: number
  stochastic: {
    k: number
    d: number
  }
  williamsR: number
  atr: number
}

export interface StockPrediction {
  symbol: string
  currentPrice: number
  predictions: {
    nextDay: {
      price: number
      confidence: number
      direction: 'up' | 'down' | 'neutral'
      change: number
      changePercent: number
    }
    nextWeek: {
      price: number
      confidence: number
      direction: 'up' | 'down' | 'neutral'
      change: number
      changePercent: number
    }
    nextMonth: {
      price: number
      confidence: number
      direction: 'up' | 'down' | 'neutral'
      change: number
      changePercent: number
    }
  }
  technicalAnalysis: {
    trend: 'bullish' | 'bearish' | 'neutral'
    strength: number // 0-100
    support: number
    resistance: number
    indicators: TechnicalIndicators
  }
  sentimentAnalysis: {
    score: number // -1 to 1
    label: 'very_negative' | 'negative' | 'neutral' | 'positive' | 'very_positive'
    newsCount: number
    socialMentions: number
  }
  riskMetrics: {
    volatility: number
    beta: number
    sharpeRatio: number
    maxDrawdown: number
    var95: number // Value at Risk 95%
  }
  fundamentalScore: number // 0-100
  lastUpdated: string
}

export interface OptionChain {
  symbol: string
  expiration: string
  calls: OptionContract[]
  puts: OptionContract[]
  impliedVolatility: number
  openInterest: number
  volume: number
}

export interface OptionContract {
  strike: number
  bid: number
  ask: number
  last: number
  volume: number
  openInterest: number
  impliedVolatility: number
  delta: number
  gamma: number
  theta: number
  vega: number
  rho: number
  intrinsicValue: number
  timeValue: number
  breakeven: number
}

export interface StockSearch {
  symbol: string
  name: string
  exchange: string
  sector: string
  industry: string
  marketCap: number
  price: number
  change: number
  changePercent: number
  volume: number
  avgVolume: number
  pe: number
  eps: number
  dividend: number
  yield: number
}

// Mock historical data generator for ML training
const generateHistoricalData = (symbol: string, days: number = 252) => {
  const data = []
  let basePrice = Math.random() * 200 + 50 // Random base price between 50-250
  
  for (let i = 0; i < days; i++) {
    const volatility = 0.02 // 2% daily volatility
    const trend = Math.sin(i / 30) * 0.001 // Slight trending pattern
    const randomChange = (Math.random() - 0.5) * volatility * 2
    
    basePrice = basePrice * (1 + trend + randomChange)
    
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString(),
      open: basePrice * (1 + (Math.random() - 0.5) * 0.01),
      high: basePrice * (1 + Math.random() * 0.02),
      low: basePrice * (1 - Math.random() * 0.02),
      close: basePrice,
      volume: Math.floor(Math.random() * 10000000) + 1000000
    })
  }
  
  return data
}

// Technical Analysis Calculations
class TechnicalAnalysis {
  static calculateRSI(prices: number[], period: number = 14): number {
    if (prices.length < period + 1) return 50
    
    let gains = 0
    let losses = 0
    
    for (let i = 1; i <= period; i++) {
      const change = prices[i] - prices[i - 1]
      if (change > 0) gains += change
      else losses -= change
    }
    
    const avgGain = gains / period
    const avgLoss = losses / period
    
    if (avgLoss === 0) return 100
    
    const rs = avgGain / avgLoss
    return 100 - (100 / (1 + rs))
  }
  
  static calculateSMA(prices: number[], period: number): number {
    if (prices.length < period) return prices[prices.length - 1]
    
    const sum = prices.slice(-period).reduce((a, b) => a + b, 0)
    return sum / period
  }
  
  static calculateEMA(prices: number[], period: number): number {
    if (prices.length < period) return prices[prices.length - 1]
    
    const multiplier = 2 / (period + 1)
    let ema = prices[0]
    
    for (let i = 1; i < prices.length; i++) {
      ema = (prices[i] * multiplier) + (ema * (1 - multiplier))
    }
    
    return ema
  }
  
  static calculateMACD(prices: number[]): { macd: number; signal: number; histogram: number } {
    const ema12 = this.calculateEMA(prices, 12)
    const ema26 = this.calculateEMA(prices, 26)
    const macd = ema12 - ema26
    
    // Simplified signal line calculation
    const signal = macd * 0.9 // Approximation
    const histogram = macd - signal
    
    return { macd, signal, histogram }
  }
  
  static calculateBollingerBands(prices: number[], period: number = 20, stdDev: number = 2) {
    const sma = this.calculateSMA(prices, period)
    const recentPrices = prices.slice(-period)
    
    const variance = recentPrices.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period
    const standardDeviation = Math.sqrt(variance)
    
    return {
      upper: sma + (standardDeviation * stdDev),
      middle: sma,
      lower: sma - (standardDeviation * stdDev)
    }
  }
}

// AI Prediction Engine (Simplified LSTM-like model)
class PredictionEngine {
  static predictPrice(historicalData: any[], currentPrice: number, timeframe: 'day' | 'week' | 'month'): {
    price: number
    confidence: number
    direction: 'up' | 'down' | 'neutral'
    change: number
    changePercent: number
  } {
    const prices = historicalData.map(d => d.close)
    
    // Simple trend analysis
    const shortTrend = this.calculateTrend(prices.slice(-5))
    const mediumTrend = this.calculateTrend(prices.slice(-20))
    const longTrend = this.calculateTrend(prices.slice(-50))
    
    // Technical indicators influence
    const rsi = TechnicalAnalysis.calculateRSI(prices)
    const macd = TechnicalAnalysis.calculateMACD(prices)
    
    // Combine signals
    let trendScore = (shortTrend * 0.5) + (mediumTrend * 0.3) + (longTrend * 0.2)
    
    // RSI influence
    if (rsi > 70) trendScore -= 0.2 // Overbought
    if (rsi < 30) trendScore += 0.2 // Oversold
    
    // MACD influence
    if (macd.macd > macd.signal) trendScore += 0.1
    else trendScore -= 0.1
    
    // Time-based multipliers
    const timeMultipliers = {
      day: 0.01,
      week: 0.03,
      month: 0.08
    }
    
    const multiplier = timeMultipliers[timeframe]
    const predictedChange = trendScore * multiplier * currentPrice
    const predictedPrice = currentPrice + predictedChange
    
    // Calculate confidence based on trend consistency
    const confidence = Math.min(Math.abs(trendScore) * 100, 95)
    
    const changePercent = (predictedChange / currentPrice) * 100
    const direction = changePercent > 0.5 ? 'up' : changePercent < -0.5 ? 'down' : 'neutral'
    
    return {
      price: Math.round(predictedPrice * 100) / 100,
      confidence: Math.round(confidence),
      direction,
      change: Math.round(predictedChange * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100
    }
  }
  
  private static calculateTrend(prices: number[]): number {
    if (prices.length < 2) return 0
    
    let trend = 0
    for (let i = 1; i < prices.length; i++) {
      trend += (prices[i] - prices[i - 1]) / prices[i - 1]
    }
    
    return trend / (prices.length - 1)
  }
}

// Sentiment Analysis (Mock implementation)
class SentimentAnalysis {
  static analyzeSentiment(symbol: string): {
    score: number
    label: 'very_negative' | 'negative' | 'neutral' | 'positive' | 'very_positive'
    newsCount: number
    socialMentions: number
  } {
    // Mock sentiment based on symbol characteristics
    const score = (Math.random() - 0.5) * 2 // -1 to 1
    
    let label: 'very_negative' | 'negative' | 'neutral' | 'positive' | 'very_positive'
    if (score > 0.6) label = 'very_positive'
    else if (score > 0.2) label = 'positive'
    else if (score > -0.2) label = 'neutral'
    else if (score > -0.6) label = 'negative'
    else label = 'very_negative'
    
    return {
      score: Math.round(score * 100) / 100,
      label,
      newsCount: Math.floor(Math.random() * 50) + 10,
      socialMentions: Math.floor(Math.random() * 1000) + 100
    }
  }
}

export class StockAnalysisService {
  private static instance: StockAnalysisService
  private cache: Map<string, any> = new Map()
  private cacheExpiry: Map<string, number> = new Map()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  static getInstance(): StockAnalysisService {
    if (!StockAnalysisService.instance) {
      StockAnalysisService.instance = new StockAnalysisService()
    }
    return StockAnalysisService.instance
  }

  private isCacheValid(key: string): boolean {
    const expiry = this.cacheExpiry.get(key)
    return expiry ? Date.now() < expiry : false
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, data)
    this.cacheExpiry.set(key, Date.now() + this.CACHE_DURATION)
  }

  // Search stocks by symbol or name
  async searchStocks(query: string): Promise<StockSearch[]> {
    const cacheKey = `search_${query.toLowerCase()}`
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    // Mock stock search results
    const mockStocks: StockSearch[] = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        exchange: 'NASDAQ',
        sector: 'Technology',
        industry: 'Consumer Electronics',
        marketCap: 3000000000000,
        price: 175.50,
        change: 2.30,
        changePercent: 1.33,
        volume: 45000000,
        avgVolume: 50000000,
        pe: 28.5,
        eps: 6.15,
        dividend: 0.96,
        yield: 0.55
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        exchange: 'NASDAQ',
        sector: 'Technology',
        industry: 'Internet Services',
        marketCap: 1800000000000,
        price: 142.80,
        change: -1.20,
        changePercent: -0.83,
        volume: 25000000,
        avgVolume: 28000000,
        pe: 25.2,
        eps: 5.67,
        dividend: 0,
        yield: 0
      },
      {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        exchange: 'NASDAQ',
        sector: 'Automotive',
        industry: 'Electric Vehicles',
        marketCap: 800000000000,
        price: 248.50,
        change: 8.75,
        changePercent: 3.65,
        volume: 85000000,
        avgVolume: 75000000,
        pe: 45.8,
        eps: 5.42,
        dividend: 0,
        yield: 0
      },
      {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        exchange: 'NASDAQ',
        sector: 'Technology',
        industry: 'Semiconductors',
        marketCap: 1200000000000,
        price: 485.20,
        change: 12.40,
        changePercent: 2.62,
        volume: 35000000,
        avgVolume: 40000000,
        pe: 65.3,
        eps: 7.43,
        dividend: 0.16,
        yield: 0.03
      }
    ]

    const filtered = mockStocks.filter(stock => 
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase())
    )

    this.setCache(cacheKey, filtered)
    return filtered
  }

  // Get comprehensive stock analysis with predictions
  async getStockAnalysis(symbol: string): Promise<StockPrediction> {
    const cacheKey = `analysis_${symbol}`
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    // Generate historical data for analysis
    const historicalData = generateHistoricalData(symbol, 252)
    const prices = historicalData.map(d => d.close)
    const currentPrice = prices[prices.length - 1]

    // Calculate technical indicators
    const rsi = TechnicalAnalysis.calculateRSI(prices)
    const macd = TechnicalAnalysis.calculateMACD(prices)
    const bollingerBands = TechnicalAnalysis.calculateBollingerBands(prices)
    const sma20 = TechnicalAnalysis.calculateSMA(prices, 20)
    const sma50 = TechnicalAnalysis.calculateSMA(prices, 50)
    const ema12 = TechnicalAnalysis.calculateEMA(prices, 12)
    const ema26 = TechnicalAnalysis.calculateEMA(prices, 26)

    const indicators: TechnicalIndicators = {
      rsi: Math.round(rsi * 100) / 100,
      macd,
      bollingerBands,
      sma20: Math.round(sma20 * 100) / 100,
      sma50: Math.round(sma50 * 100) / 100,
      ema12: Math.round(ema12 * 100) / 100,
      ema26: Math.round(ema26 * 100) / 100,
      stochastic: {
        k: Math.random() * 100,
        d: Math.random() * 100
      },
      williamsR: (Math.random() - 0.5) * 100,
      atr: Math.random() * 5 + 1
    }

    // Generate predictions
    const nextDay = PredictionEngine.predictPrice(historicalData, currentPrice, 'day')
    const nextWeek = PredictionEngine.predictPrice(historicalData, currentPrice, 'week')
    const nextMonth = PredictionEngine.predictPrice(historicalData, currentPrice, 'month')

    // Analyze sentiment
    const sentiment = SentimentAnalysis.analyzeSentiment(symbol)

    // Determine trend
    let trend: 'bullish' | 'bearish' | 'neutral' = 'neutral'
    let strength = 50

    if (currentPrice > sma20 && sma20 > sma50 && rsi < 70) {
      trend = 'bullish'
      strength = Math.min(70 + (currentPrice - sma20) / sma20 * 100, 95)
    } else if (currentPrice < sma20 && sma20 < sma50 && rsi > 30) {
      trend = 'bearish'
      strength = Math.max(30 - (sma20 - currentPrice) / sma20 * 100, 5)
    }

    const analysis: StockPrediction = {
      symbol,
      currentPrice: Math.round(currentPrice * 100) / 100,
      predictions: {
        nextDay,
        nextWeek,
        nextMonth
      },
      technicalAnalysis: {
        trend,
        strength: Math.round(strength),
        support: Math.round(bollingerBands.lower * 100) / 100,
        resistance: Math.round(bollingerBands.upper * 100) / 100,
        indicators
      },
      sentimentAnalysis: sentiment,
      riskMetrics: {
        volatility: Math.random() * 0.4 + 0.1,
        beta: Math.random() * 2 + 0.5,
        sharpeRatio: Math.random() * 2 - 0.5,
        maxDrawdown: Math.random() * 0.3 + 0.05,
        var95: Math.random() * 0.1 + 0.02
      },
      fundamentalScore: Math.floor(Math.random() * 40) + 60,
      lastUpdated: new Date().toISOString()
    }

    this.setCache(cacheKey, analysis)
    return analysis
  }

  // Get options chain data
  async getOptionsChain(symbol: string, expiration?: string): Promise<OptionChain[]> {
    const cacheKey = `options_${symbol}_${expiration || 'all'}`
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    // Mock options data
    const stockPrice = 150 + Math.random() * 100
    const expirations = ['2024-12-20', '2025-01-17', '2025-02-21', '2025-03-21']
    
    const optionsChains = expirations.map(exp => {
      const daysToExpiry = Math.floor((new Date(exp).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      const timeDecay = Math.max(0.1, daysToExpiry / 365)
      
      const strikes = []
      for (let i = -10; i <= 10; i++) {
        strikes.push(Math.round((stockPrice + (i * 5)) / 5) * 5)
      }
      
      const calls: OptionContract[] = strikes.map(strike => {
        const intrinsic = Math.max(0, stockPrice - strike)
        const timeValue = Math.random() * 10 * timeDecay
        const price = intrinsic + timeValue
        
        return {
          strike,
          bid: Math.max(0.01, price - 0.05),
          ask: price + 0.05,
          last: price,
          volume: Math.floor(Math.random() * 1000),
          openInterest: Math.floor(Math.random() * 5000),
          impliedVolatility: 0.2 + Math.random() * 0.3,
          delta: Math.max(0, Math.min(1, (stockPrice - strike) / 100 + 0.5)),
          gamma: Math.random() * 0.1,
          theta: -Math.random() * 0.5,
          vega: Math.random() * 0.3,
          rho: Math.random() * 0.1,
          intrinsicValue: intrinsic,
          timeValue,
          breakeven: strike + price
        }
      })
      
      const puts: OptionContract[] = strikes.map(strike => {
        const intrinsic = Math.max(0, strike - stockPrice)
        const timeValue = Math.random() * 10 * timeDecay
        const price = intrinsic + timeValue
        
        return {
          strike,
          bid: Math.max(0.01, price - 0.05),
          ask: price + 0.05,
          last: price,
          volume: Math.floor(Math.random() * 1000),
          openInterest: Math.floor(Math.random() * 5000),
          impliedVolatility: 0.2 + Math.random() * 0.3,
          delta: Math.max(-1, Math.min(0, (stockPrice - strike) / 100 - 0.5)),
          gamma: Math.random() * 0.1,
          theta: -Math.random() * 0.5,
          vega: Math.random() * 0.3,
          rho: -Math.random() * 0.1,
          intrinsicValue: intrinsic,
          timeValue,
          breakeven: strike - price
        }
      })
      
      return {
        symbol,
        expiration: exp,
        calls,
        puts,
        impliedVolatility: 0.25 + Math.random() * 0.2,
        openInterest: calls.reduce((sum, c) => sum + c.openInterest, 0) + puts.reduce((sum, p) => sum + p.openInterest, 0),
        volume: calls.reduce((sum, c) => sum + c.volume, 0) + puts.reduce((sum, p) => sum + p.volume, 0)
      }
    })

    this.setCache(cacheKey, optionsChains)
    return expiration ? optionsChains.filter(chain => chain.expiration === expiration) : optionsChains
  }

  // Format currency
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  // Format large numbers
  static formatLargeNumber(num: number): string {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T'
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
    return num.toString()
  }

  // Format percentage
  static formatPercentage(percentage: number): string {
    const sign = percentage >= 0 ? '+' : ''
    return `${sign}${percentage.toFixed(2)}%`
  }
}

export const stockAnalysisService = StockAnalysisService.getInstance()
