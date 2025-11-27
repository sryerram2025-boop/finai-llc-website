// Stock Portfolio Service for FinAI LLC
// Handles stock data fetching and portfolio calculations

export interface StockHolding {
  symbol: string
  name: string
  shares: number
  purchasePrice: number
  currentPrice: number
  change: number
  changePercent: number
  marketValue: number
  totalGainLoss: number
  totalGainLossPercent: number
  sector: string
  lastUpdated: string
}

export interface PortfolioSummary {
  totalValue: number
  totalCost: number
  totalGainLoss: number
  totalGainLossPercent: number
  dayChange: number
  dayChangePercent: number
  holdings: StockHolding[]
  lastUpdated: string
}

// Mock data for demonstration - replace with real API calls
const MOCK_STOCKS = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 50,
    purchasePrice: 150.00,
    sector: 'Technology'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 25,
    purchasePrice: 2500.00,
    sector: 'Technology'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 40,
    purchasePrice: 300.00,
    sector: 'Technology'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    shares: 30,
    purchasePrice: 200.00,
    sector: 'Automotive'
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    shares: 20,
    purchasePrice: 400.00,
    sector: 'Technology'
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    shares: 35,
    purchasePrice: 140.00,
    sector: 'Financial'
  }
]

// Simulate real-time stock prices (in production, use real API)
const generateMockPrice = (basePrice: number): number => {
  const volatility = 0.05 // 5% volatility
  const randomChange = (Math.random() - 0.5) * 2 * volatility
  return Math.round((basePrice * (1 + randomChange)) * 100) / 100
}

const generateMockChange = (currentPrice: number, previousPrice: number) => {
  const change = currentPrice - previousPrice
  const changePercent = (change / previousPrice) * 100
  return {
    change: Math.round(change * 100) / 100,
    changePercent: Math.round(changePercent * 100) / 100
  }
}

export class StockService {
  private static instance: StockService
  private cache: Map<string, any> = new Map()
  private cacheExpiry: Map<string, number> = new Map()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  static getInstance(): StockService {
    if (!StockService.instance) {
      StockService.instance = new StockService()
    }
    return StockService.instance
  }

  private isCacheValid(key: string): boolean {
    const expiry = this.cacheExpiry.get(key)
    return expiry ? Date.now() < expiry : false
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, data)
    this.cacheExpiry.set(key, Date.now() + this.CACHE_DURATION)
  }

  // Fetch current stock price (mock implementation)
  async fetchStockPrice(symbol: string): Promise<{ price: number; change: number; changePercent: number }> {
    const cacheKey = `price_${symbol}`
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))

    // Find base price from mock data
    const stock = MOCK_STOCKS.find(s => s.symbol === symbol)
    const basePrice = stock?.purchasePrice || 100

    // Generate realistic price movement
    const currentPrice = generateMockPrice(basePrice * 1.1) // Assume some growth
    const previousPrice = generateMockPrice(basePrice * 1.08)
    const { change, changePercent } = generateMockChange(currentPrice, previousPrice)

    const result = {
      price: currentPrice,
      change,
      changePercent
    }

    this.setCache(cacheKey, result)
    return result
  }

  // Fetch multiple stock prices
  async fetchMultipleStockPrices(symbols: string[]): Promise<Map<string, any>> {
    const promises = symbols.map(symbol => 
      this.fetchStockPrice(symbol).then(data => ({ symbol, data }))
    )
    
    const results = await Promise.all(promises)
    const priceMap = new Map()
    
    results.forEach(({ symbol, data }) => {
      priceMap.set(symbol, data)
    })
    
    return priceMap
  }

  // Calculate portfolio holdings with current prices
  async getPortfolioHoldings(): Promise<StockHolding[]> {
    const symbols = MOCK_STOCKS.map(stock => stock.symbol)
    const priceData = await this.fetchMultipleStockPrices(symbols)
    
    const holdings: StockHolding[] = MOCK_STOCKS.map(stock => {
      const currentData = priceData.get(stock.symbol)
      const currentPrice = currentData?.price || stock.purchasePrice
      const change = currentData?.change || 0
      const changePercent = currentData?.changePercent || 0
      
      const marketValue = currentPrice * stock.shares
      const totalCost = stock.purchasePrice * stock.shares
      const totalGainLoss = marketValue - totalCost
      const totalGainLossPercent = (totalGainLoss / totalCost) * 100
      
      return {
        symbol: stock.symbol,
        name: stock.name,
        shares: stock.shares,
        purchasePrice: stock.purchasePrice,
        currentPrice,
        change,
        changePercent,
        marketValue,
        totalGainLoss,
        totalGainLossPercent: Math.round(totalGainLossPercent * 100) / 100,
        sector: stock.sector,
        lastUpdated: new Date().toISOString()
      }
    })
    
    return holdings
  }

  // Get complete portfolio summary
  async getPortfolioSummary(): Promise<PortfolioSummary> {
    const holdings = await this.getPortfolioHoldings()
    
    const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0)
    const totalCost = holdings.reduce((sum, holding) => sum + (holding.purchasePrice * holding.shares), 0)
    const totalGainLoss = totalValue - totalCost
    const totalGainLossPercent = (totalGainLoss / totalCost) * 100
    
    // Calculate day change (sum of all individual stock day changes)
    const dayChange = holdings.reduce((sum, holding) => sum + (holding.change * holding.shares), 0)
    const dayChangePercent = (dayChange / (totalValue - dayChange)) * 100
    
    return {
      totalValue: Math.round(totalValue * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      totalGainLoss: Math.round(totalGainLoss * 100) / 100,
      totalGainLossPercent: Math.round(totalGainLossPercent * 100) / 100,
      dayChange: Math.round(dayChange * 100) / 100,
      dayChangePercent: Math.round(dayChangePercent * 100) / 100,
      holdings,
      lastUpdated: new Date().toISOString()
    }
  }

  // Get sector allocation
  async getSectorAllocation(): Promise<{ sector: string; value: number; percentage: number }[]> {
    const holdings = await this.getPortfolioHoldings()
    const totalValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0)
    
    const sectorMap = new Map<string, number>()
    
    holdings.forEach(holding => {
      const currentValue = sectorMap.get(holding.sector) || 0
      sectorMap.set(holding.sector, currentValue + holding.marketValue)
    })
    
    return Array.from(sectorMap.entries()).map(([sector, value]) => ({
      sector,
      value: Math.round(value * 100) / 100,
      percentage: Math.round((value / totalValue) * 100 * 100) / 100
    }))
  }

  // Get top performers
  async getTopPerformers(limit: number = 3): Promise<StockHolding[]> {
    const holdings = await this.getPortfolioHoldings()
    return holdings
      .sort((a, b) => b.totalGainLossPercent - a.totalGainLossPercent)
      .slice(0, limit)
  }

  // Get worst performers
  async getWorstPerformers(limit: number = 3): Promise<StockHolding[]> {
    const holdings = await this.getPortfolioHoldings()
    return holdings
      .sort((a, b) => a.totalGainLossPercent - b.totalGainLossPercent)
      .slice(0, limit)
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

  // Format percentage
  static formatPercentage(percentage: number): string {
    const sign = percentage >= 0 ? '+' : ''
    return `${sign}${percentage.toFixed(2)}%`
  }
}

export const stockService = StockService.getInstance()
