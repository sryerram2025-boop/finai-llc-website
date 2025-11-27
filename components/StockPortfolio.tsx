'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  FaChartLine, 
  FaArrowUp, 
  FaArrowDown, 
  FaSync, 
  FaEye,
  FaEyeSlash,
  FaChartPie,
  FaTrophy,
  FaExclamationTriangle
} from 'react-icons/fa'
import { stockService, PortfolioSummary, StockHolding, StockService } from '@/lib/stockService'

const StockPortfolio = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioSummary | null>(null)
  const [sectorData, setSectorData] = useState<any[]>([])
  const [topPerformers, setTopPerformers] = useState<StockHolding[]>([])
  const [worstPerformers, setWorstPerformers] = useState<StockHolding[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showValues, setShowValues] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'holdings' | 'sectors'>('overview')
  const [livePrices, setLivePrices] = useState<Map<string, { price: number; change: number; changePercent: number }>>(new Map())
  const [priceAnimations, setPriceAnimations] = useState<Map<string, 'up' | 'down' | 'neutral'>>(new Map())

  const fetchPortfolioData = async () => {
    try {
      const [summary, sectors, top, worst] = await Promise.all([
        stockService.getPortfolioSummary(),
        stockService.getSectorAllocation(),
        stockService.getTopPerformers(3),
        stockService.getWorstPerformers(3)
      ])
      
      setPortfolioData(summary)
      setSectorData(sectors)
      setTopPerformers(top)
      setWorstPerformers(worst)
    } catch (error) {
      console.error('Error fetching portfolio data:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchPortfolioData()
  }

  // Live price updates (optimized)
  const updateLivePrices = useCallback(async () => {
    if (!portfolioData || portfolioData.holdings.length === 0) return
    
    try {
      const newPrices = new Map()
      const newAnimations = new Map()
      
      // Only update a few stocks at a time to reduce load
      const holdingsToUpdate = portfolioData.holdings.slice(0, 3) // Update only first 3 stocks
      
      for (const holding of holdingsToUpdate) {
        const oldPrice = livePrices.get(holding.symbol)?.price || holding.currentPrice
        
        // Simulate live price movement (±0.3% random change - smaller movements)
        const volatility = 0.003 // 0.3% volatility (reduced)
        const randomChange = (Math.random() - 0.5) * 2 * volatility
        const newPrice = oldPrice * (1 + randomChange)
        const change = newPrice - holding.purchasePrice
        const changePercent = (change / holding.purchasePrice) * 100
        
        // Only animate if change is significant (>0.1%)
        let animation: 'up' | 'down' | 'neutral' = 'neutral'
        const priceChangePercent = ((newPrice - oldPrice) / oldPrice) * 100
        if (Math.abs(priceChangePercent) > 0.1) {
          animation = newPrice > oldPrice ? 'up' : 'down'
        }
        
        newPrices.set(holding.symbol, {
          price: Math.round(newPrice * 100) / 100,
          change: Math.round(change * 100) / 100,
          changePercent: Math.round(changePercent * 100) / 100
        })
        
        if (animation !== 'neutral') {
          newAnimations.set(holding.symbol, animation)
        }
      }
      
      // Copy existing prices for stocks not updated
      portfolioData.holdings.slice(3).forEach(holding => {
        if (livePrices.has(holding.symbol)) {
          newPrices.set(holding.symbol, livePrices.get(holding.symbol)!)
        }
      })
      
      setLivePrices(newPrices)
      if (newAnimations.size > 0) {
        setPriceAnimations(newAnimations)
        
        // Clear animations after 600ms (faster)
        setTimeout(() => {
          setPriceAnimations(new Map())
        }, 600)
      }
      
    } catch (error) {
      console.error('Error updating live prices:', error)
    }
  }, [portfolioData, livePrices])

  useEffect(() => {
    fetchPortfolioData()
    
    // Auto-refresh portfolio data every 60 seconds (less frequent)
    const portfolioInterval = setInterval(fetchPortfolioData, 60000)
    
    // Update live prices every 8 seconds (less frequent for better performance)
    const priceInterval = setInterval(updateLivePrices, 8000)
    
    return () => {
      clearInterval(portfolioInterval)
      clearInterval(priceInterval)
    }
  }, [updateLivePrices])

  // Start live price updates after initial data load
  useEffect(() => {
    if (portfolioData && !loading) {
      const timer = setTimeout(() => {
        updateLivePrices()
      }, 5000) // Start after 5 seconds (give page time to load)
      
      return () => clearTimeout(timer)
    }
  }, [portfolioData, loading, updateLivePrices])

  const formatValue = (value: number) => {
    return showValues ? StockService.formatCurrency(value) : '••••••'
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getChangeBgColor = (change: number) => {
    if (change > 0) return 'bg-green-100'
    if (change < 0) return 'bg-red-100'
    return 'bg-gray-100'
  }

  const getLivePrice = (symbol: string, originalPrice: number) => {
    const liveData = livePrices.get(symbol)
    return liveData ? liveData.price : originalPrice
  }

  const getLiveChange = (symbol: string, originalChange: number, originalChangePercent: number) => {
    const liveData = livePrices.get(symbol)
    return liveData ? { change: liveData.change, changePercent: liveData.changePercent } : { change: originalChange, changePercent: originalChangePercent }
  }

  const getPriceAnimation = (symbol: string) => {
    const animation = priceAnimations.get(symbol)
    if (animation === 'up') return 'bg-green-50 border-l-2 border-green-400'
    if (animation === 'down') return 'bg-red-50 border-l-2 border-red-400'
    return ''
  }

  if (loading) {
    return (
      <section id="stock-portfolio" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading portfolio data...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!portfolioData) {
    return (
      <section id="stock-portfolio" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error loading portfolio data</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="stock-portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Stock <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Real-time portfolio tracking powered by AI-driven analytics and insights.
          </p>
          
          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50"
            >
              <FaSync className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowValues(!showValues)}
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition-colors duration-200"
            >
              {showValues ? <FaEyeSlash /> : <FaEye />}
              {showValues ? 'Hide Values' : 'Show Values'}
            </motion.button>

            {/* Live Price Indicator */}
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-6 py-2 rounded-full font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live Prices
            </div>
          </div>
        </motion.div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Value</h3>
              <FaChartLine className="text-primary-600 text-xl" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatValue(portfolioData.totalValue)}
            </div>
            <div className={`flex items-center gap-1 text-sm ${getChangeColor(portfolioData.dayChange)}`}>
              {portfolioData.dayChange >= 0 ? <FaArrowUp /> : <FaArrowDown />}
              {showValues && (
                <>
                  {StockService.formatCurrency(Math.abs(portfolioData.dayChange))} 
                  ({StockService.formatPercentage(portfolioData.dayChangePercent)})
                </>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Gain/Loss</h3>
              <div className={`p-2 rounded-full ${getChangeBgColor(portfolioData.totalGainLoss)}`}>
                {portfolioData.totalGainLoss >= 0 ? 
                  <FaArrowUp className="text-green-600" /> : 
                  <FaArrowDown className="text-red-600" />
                }
              </div>
            </div>
            <div className={`text-3xl font-bold mb-2 ${getChangeColor(portfolioData.totalGainLoss)}`}>
              {showValues ? StockService.formatCurrency(portfolioData.totalGainLoss) : '••••••'}
            </div>
            <div className={`text-sm ${getChangeColor(portfolioData.totalGainLoss)}`}>
              {showValues && StockService.formatPercentage(portfolioData.totalGainLossPercent)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Cost</h3>
              <FaChartPie className="text-primary-600 text-xl" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatValue(portfolioData.totalCost)}
            </div>
            <div className="text-sm text-gray-600">
              Initial Investment
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Holdings</h3>
              <div className="text-primary-600 text-xl">📊</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {portfolioData.holdings.length}
            </div>
            <div className="text-sm text-gray-600">
              Active Positions
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg">
            {[
              { id: 'overview', label: 'Overview', icon: FaChartLine },
                  { id: 'holdings', label: 'Holdings', icon: FaChartPie },
              { id: 'sectors', label: 'Sectors', icon: FaTrophy }
            ].map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <Icon />
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Performers */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-full">
                  <FaTrophy className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Top Performers</h3>
              </div>
              <div className="space-y-4">
                {topPerformers.map((stock, index) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">{stock.symbol}</div>
                      <div className="text-sm text-gray-600">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        {showValues && StockService.formatPercentage(stock.totalGainLossPercent)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {showValues && StockService.formatCurrency(stock.totalGainLoss)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Worst Performers */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-full">
                  <FaExclamationTriangle className="text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Needs Attention</h3>
              </div>
              <div className="space-y-4">
                {worstPerformers.map((stock, index) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">{stock.symbol}</div>
                      <div className="text-sm text-gray-600">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-red-600">
                        {showValues && StockService.formatPercentage(stock.totalGainLossPercent)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {showValues && StockService.formatCurrency(stock.totalGainLoss)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'holdings' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl overflow-hidden shadow-lg"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Symbol</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Shares</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Current Price</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Market Value</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Gain/Loss</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Day Change</th>
                  </tr>
                </thead>
                            <tbody className="divide-y divide-gray-200">
                              {portfolioData.holdings.map((stock) => {
                                const livePrice = getLivePrice(stock.symbol, stock.currentPrice)
                                const liveChange = getLiveChange(stock.symbol, stock.change, stock.changePercent)
                                const liveMarketValue = livePrice * stock.shares
                                const liveTotalGainLoss = liveMarketValue - (stock.purchasePrice * stock.shares)
                                const liveTotalGainLossPercent = (liveTotalGainLoss / (stock.purchasePrice * stock.shares)) * 100
                                const animationClass = getPriceAnimation(stock.symbol)
                                
                                return (
                                  <tr key={stock.symbol} className={`hover:bg-gray-50 transition-colors duration-200 ${animationClass}`}>
                                    <td className="px-6 py-4">
                                      <div className="font-semibold text-gray-900">{stock.symbol}</div>
                                      <div className="text-sm text-gray-600">{stock.sector}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">{stock.name}</td>
                                    <td className="px-6 py-4 text-right text-gray-900">{stock.shares}</td>
                                    <td className="px-6 py-4 text-right">
                                      <div className={`font-semibold text-gray-900 transition-colors duration-200 ${
                                        priceAnimations.get(stock.symbol) === 'up' ? 'text-green-600' :
                                        priceAnimations.get(stock.symbol) === 'down' ? 'text-red-600' : ''
                                      }`}>
                                        {showValues ? StockService.formatCurrency(livePrice) : '••••'}
                                      </div>
                                      {livePrices.has(stock.symbol) && (
                                        <div className="text-xs text-gray-500">
                                          Live
                                        </div>
                                      )}
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-900">
                                      <div className="font-semibold">
                                        {showValues ? StockService.formatCurrency(liveMarketValue) : '••••'}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                      <div className={`font-semibold ${getChangeColor(liveTotalGainLoss)}`}>
                                        {showValues ? StockService.formatCurrency(liveTotalGainLoss) : '••••'}
                                      </div>
                                      <div className={`text-sm ${getChangeColor(liveTotalGainLoss)}`}>
                                        {showValues && StockService.formatPercentage(liveTotalGainLossPercent)}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                      <div className={`flex items-center justify-end gap-1 font-semibold ${getChangeColor(liveChange.change)}`}>
                                        {liveChange.change >= 0 ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
                                        <span className="transition-colors duration-200">
                                          {showValues && StockService.formatPercentage(liveChange.changePercent)}
                                        </span>
                                      </div>
                                      {livePrices.has(stock.symbol) && (
                                        <div className="text-xs text-gray-500 flex items-center justify-end gap-1 mt-1">
                                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                          Live
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'sectors' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Sector Allocation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectorData.map((sector, index) => (
                <div key={sector.sector} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{sector.sector}</h4>
                    <span className="text-sm text-gray-600">{sector.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${sector.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-primary-600 h-2 rounded-full"
                    ></motion.div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatValue(sector.value)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8 space-y-2"
        >
          <p className="text-sm text-gray-500">
            Portfolio data: {new Date(portfolioData.lastUpdated).toLocaleString()}
          </p>
          {livePrices.size > 0 && (
            <p className="text-sm text-green-600 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live prices updating every 8 seconds
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default StockPortfolio
