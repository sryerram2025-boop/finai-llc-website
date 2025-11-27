'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaSearch, 
  FaChartLine, 
  FaArrowUp, 
  FaArrowDown, 
  FaBrain,
  FaRobot,
  FaEye,
  FaCalculator,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaFire,
  FaSnowflake,
  FaLongArrowAltUp,
  FaLongArrowAltDown
} from 'react-icons/fa'
import { 
  stockAnalysisService, 
  StockAnalysisService,
  StockSearch, 
  StockPrediction, 
  OptionChain 
} from '@/lib/stockAnalysisService'

const StockTicker = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<StockSearch[]>([])
  const [selectedStock, setSelectedStock] = useState<string | null>(null)
  const [stockAnalysis, setStockAnalysis] = useState<StockPrediction | null>(null)
  const [optionsData, setOptionsData] = useState<OptionChain[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'search' | 'analysis' | 'predictions' | 'options'>('search')
  const [selectedExpiration, setSelectedExpiration] = useState<string>('')

  // Search stocks
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setLoading(true)
    try {
      const results = await stockAnalysisService.searchStocks(query)
      setSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Select stock for analysis
  const selectStock = async (symbol: string) => {
    setSelectedStock(symbol)
    setLoading(true)
    setActiveTab('analysis')

    try {
      const [analysis, options] = await Promise.all([
        stockAnalysisService.getStockAnalysis(symbol),
        stockAnalysisService.getOptionsChain(symbol)
      ])
      
      setStockAnalysis(analysis)
      setOptionsData(options)
      if (options.length > 0) {
        setSelectedExpiration(options[0].expiration)
      }
    } catch (error) {
      console.error('Analysis error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, handleSearch])

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600'
    if (confidence >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-100'
    if (confidence >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <FaArrowUp className="text-green-600" />
      case 'down': return <FaArrowDown className="text-red-600" />
      default: return <FaClock className="text-gray-600" />
    }
  }

  const getSentimentIcon = (label: string) => {
    switch (label) {
      case 'very_positive': return <FaFire className="text-green-600" />
      case 'positive': return <FaCheckCircle className="text-green-500" />
      case 'neutral': return <FaClock className="text-gray-500" />
      case 'negative': return <FaExclamationTriangle className="text-red-500" />
      case 'very_negative': return <FaSnowflake className="text-red-600" />
      default: return <FaClock className="text-gray-500" />
    }
  }

  return (
    <section id="stock-ticker" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
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
            AI-Powered <span className="gradient-text">Stock Analysis</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Advanced stock analysis with machine learning predictions, technical indicators, and options trading insights.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stocks by symbol or company name (e.g., AAPL, Apple)"
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
            />
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {searchResults.map((stock) => (
                  <motion.div
                    key={stock.symbol}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectStock(stock.symbol)}
                    className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{stock.symbol}</h3>
                        <p className="text-sm text-gray-600 truncate">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {StockAnalysisService.formatCurrency(stock.price)}
                        </div>
                        <div className={`text-sm flex items-center gap-1 ${
                          stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.change >= 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                          {StockAnalysisService.formatPercentage(stock.changePercent)}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {stock.sector} • {StockAnalysisService.formatLargeNumber(stock.marketCap)} Market Cap
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Analyzing...</p>
            </div>
          )}
        </motion.div>

        {/* Analysis Section */}
        {selectedStock && stockAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Stock Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">{selectedStock}</h3>
                  <p className="text-primary-100">Current Price: {StockAnalysisService.formatCurrency(stockAnalysis.currentPrice)}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-primary-100">Last Updated</div>
                  <div className="text-sm">{new Date(stockAnalysis.lastUpdated).toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'analysis', label: 'Technical Analysis', icon: FaChartLine },
                  { id: 'predictions', label: 'AI Predictions', icon: FaBrain },
                  { id: 'options', label: 'Options Chain', icon: FaCalculator }
                ].map(({ id, label, icon: Icon }) => (
                  <motion.button
                    key={id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(id as any)}
                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon />
                    {label}
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'analysis' && (
                <div className="space-y-8">
                  {/* Technical Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-center mb-2">
                        {stockAnalysis.technicalAnalysis.trend === 'bullish' ? (
                          <FaLongArrowAltUp className="text-green-600 text-2xl" />
                        ) : stockAnalysis.technicalAnalysis.trend === 'bearish' ? (
                          <FaLongArrowAltDown className="text-red-600 text-2xl" />
                        ) : (
                          <FaClock className="text-gray-600 text-2xl" />
                        )}
                      </div>
                      <div className="font-semibold text-gray-900 capitalize">
                        {stockAnalysis.technicalAnalysis.trend}
                      </div>
                      <div className="text-sm text-gray-600">
                        Strength: {stockAnalysis.technicalAnalysis.strength}%
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-center mb-2">
                        {getSentimentIcon(stockAnalysis.sentimentAnalysis.label)}
                      </div>
                      <div className="font-semibold text-gray-900 capitalize">
                        {stockAnalysis.sentimentAnalysis.label.replace('_', ' ')}
                      </div>
                      <div className="text-sm text-gray-600">
                        Score: {stockAnalysis.sentimentAnalysis.score.toFixed(2)}
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-center mb-2">
                        <FaEye className="text-primary-600 text-2xl" />
                      </div>
                      <div className="font-semibold text-gray-900">
                        Fundamental Score
                      </div>
                      <div className="text-sm text-gray-600">
                        {stockAnalysis.fundamentalScore}/100
                      </div>
                    </div>
                  </div>

                  {/* Technical Indicators */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Indicators</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="text-sm text-gray-600">RSI (14)</div>
                        <div className={`text-lg font-semibold ${
                          stockAnalysis.technicalAnalysis.indicators.rsi > 70 ? 'text-red-600' :
                          stockAnalysis.technicalAnalysis.indicators.rsi < 30 ? 'text-green-600' :
                          'text-gray-900'
                        }`}>
                          {stockAnalysis.technicalAnalysis.indicators.rsi.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {stockAnalysis.technicalAnalysis.indicators.rsi > 70 ? 'Overbought' :
                           stockAnalysis.technicalAnalysis.indicators.rsi < 30 ? 'Oversold' : 'Neutral'}
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="text-sm text-gray-600">MACD</div>
                        <div className={`text-lg font-semibold ${
                          stockAnalysis.technicalAnalysis.indicators.macd.macd > stockAnalysis.technicalAnalysis.indicators.macd.signal ? 
                          'text-green-600' : 'text-red-600'
                        }`}>
                          {stockAnalysis.technicalAnalysis.indicators.macd.macd.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Signal: {stockAnalysis.technicalAnalysis.indicators.macd.signal.toFixed(2)}
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="text-sm text-gray-600">Support</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {StockAnalysisService.formatCurrency(stockAnalysis.technicalAnalysis.support)}
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="text-sm text-gray-600">Resistance</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {StockAnalysisService.formatCurrency(stockAnalysis.technicalAnalysis.resistance)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Risk Metrics */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Risk Metrics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg text-center">
                        <div className="text-sm text-gray-600">Volatility</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {(stockAnalysis.riskMetrics.volatility * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg text-center">
                        <div className="text-sm text-gray-600">Beta</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {stockAnalysis.riskMetrics.beta.toFixed(2)}
                        </div>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg text-center">
                        <div className="text-sm text-gray-600">Sharpe Ratio</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {stockAnalysis.riskMetrics.sharpeRatio.toFixed(2)}
                        </div>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg text-center">
                        <div className="text-sm text-gray-600">Max Drawdown</div>
                        <div className="text-lg font-semibold text-red-600">
                          -{(stockAnalysis.riskMetrics.maxDrawdown * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg text-center">
                        <div className="text-sm text-gray-600">VaR (95%)</div>
                        <div className="text-lg font-semibold text-red-600">
                          -{(stockAnalysis.riskMetrics.var95 * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'predictions' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <FaRobot className="text-primary-600 text-2xl" />
                    <h4 className="text-lg font-semibold text-gray-900">AI-Powered Price Predictions</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Next Day Prediction */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-semibold text-gray-900">Next Day</h5>
                        {getTrendIcon(stockAnalysis.predictions.nextDay.direction)}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {StockAnalysisService.formatCurrency(stockAnalysis.predictions.nextDay.price)}
                      </div>
                      <div className={`text-sm mb-3 ${
                        stockAnalysis.predictions.nextDay.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {StockAnalysisService.formatCurrency(stockAnalysis.predictions.nextDay.change)} 
                        ({StockAnalysisService.formatPercentage(stockAnalysis.predictions.nextDay.changePercent)})
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        getConfidenceBg(stockAnalysis.predictions.nextDay.confidence)
                      } ${getConfidenceColor(stockAnalysis.predictions.nextDay.confidence)}`}>
                        {stockAnalysis.predictions.nextDay.confidence}% Confidence
                      </div>
                    </motion.div>

                    {/* Next Week Prediction */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-semibold text-gray-900">Next Week</h5>
                        {getTrendIcon(stockAnalysis.predictions.nextWeek.direction)}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {StockAnalysisService.formatCurrency(stockAnalysis.predictions.nextWeek.price)}
                      </div>
                      <div className={`text-sm mb-3 ${
                        stockAnalysis.predictions.nextWeek.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {StockAnalysisService.formatCurrency(stockAnalysis.predictions.nextWeek.change)} 
                        ({StockAnalysisService.formatPercentage(stockAnalysis.predictions.nextWeek.changePercent)})
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        getConfidenceBg(stockAnalysis.predictions.nextWeek.confidence)
                      } ${getConfidenceColor(stockAnalysis.predictions.nextWeek.confidence)}`}>
                        {stockAnalysis.predictions.nextWeek.confidence}% Confidence
                      </div>
                    </motion.div>

                    {/* Next Month Prediction */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-semibold text-gray-900">Next Month</h5>
                        {getTrendIcon(stockAnalysis.predictions.nextMonth.direction)}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {StockAnalysisService.formatCurrency(stockAnalysis.predictions.nextMonth.price)}
                      </div>
                      <div className={`text-sm mb-3 ${
                        stockAnalysis.predictions.nextMonth.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {StockAnalysisService.formatCurrency(stockAnalysis.predictions.nextMonth.change)} 
                        ({StockAnalysisService.formatPercentage(stockAnalysis.predictions.nextMonth.changePercent)})
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        getConfidenceBg(stockAnalysis.predictions.nextMonth.confidence)
                      } ${getConfidenceColor(stockAnalysis.predictions.nextMonth.confidence)}`}>
                        {stockAnalysis.predictions.nextMonth.confidence}% Confidence
                      </div>
                    </motion.div>
                  </div>

                  {/* Prediction Disclaimer */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <FaExclamationTriangle className="text-yellow-600 mt-0.5 mr-3" />
                      <div>
                        <h6 className="font-medium text-yellow-800">Investment Disclaimer</h6>
                        <p className="text-sm text-yellow-700 mt-1">
                          These predictions are generated by AI models for educational purposes only. 
                          Past performance does not guarantee future results. Always conduct your own research 
                          and consider consulting with a financial advisor before making investment decisions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'options' && optionsData.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">Options Chain</h4>
                    <select
                      value={selectedExpiration}
                      onChange={(e) => setSelectedExpiration(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                      {optionsData.map((chain) => (
                        <option key={chain.expiration} value={chain.expiration}>
                          {new Date(chain.expiration).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedExpiration && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Calls */}
                      <div>
                        <h5 className="font-semibold text-green-600 mb-3">Call Options</h5>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-3 py-2 text-left">Strike</th>
                                <th className="px-3 py-2 text-right">Last</th>
                                <th className="px-3 py-2 text-right">Bid</th>
                                <th className="px-3 py-2 text-right">Ask</th>
                                <th className="px-3 py-2 text-right">Vol</th>
                                <th className="px-3 py-2 text-right">IV</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {optionsData
                                .find(chain => chain.expiration === selectedExpiration)
                                ?.calls.slice(0, 10)
                                .map((option) => (
                                <tr key={option.strike} className="hover:bg-gray-50">
                                  <td className="px-3 py-2 font-medium">${option.strike}</td>
                                  <td className="px-3 py-2 text-right">${option.last.toFixed(2)}</td>
                                  <td className="px-3 py-2 text-right">${option.bid.toFixed(2)}</td>
                                  <td className="px-3 py-2 text-right">${option.ask.toFixed(2)}</td>
                                  <td className="px-3 py-2 text-right">{option.volume}</td>
                                  <td className="px-3 py-2 text-right">{(option.impliedVolatility * 100).toFixed(1)}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Puts */}
                      <div>
                        <h5 className="font-semibold text-red-600 mb-3">Put Options</h5>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-3 py-2 text-left">Strike</th>
                                <th className="px-3 py-2 text-right">Last</th>
                                <th className="px-3 py-2 text-right">Bid</th>
                                <th className="px-3 py-2 text-right">Ask</th>
                                <th className="px-3 py-2 text-right">Vol</th>
                                <th className="px-3 py-2 text-right">IV</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {optionsData
                                .find(chain => chain.expiration === selectedExpiration)
                                ?.puts.slice(0, 10)
                                .map((option) => (
                                <tr key={option.strike} className="hover:bg-gray-50">
                                  <td className="px-3 py-2 font-medium">${option.strike}</td>
                                  <td className="px-3 py-2 text-right">${option.last.toFixed(2)}</td>
                                  <td className="px-3 py-2 text-right">${option.bid.toFixed(2)}</td>
                                  <td className="px-3 py-2 text-right">${option.ask.toFixed(2)}</td>
                                  <td className="px-3 py-2 text-right">{option.volume}</td>
                                  <td className="px-3 py-2 text-right">{(option.impliedVolatility * 100).toFixed(1)}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default StockTicker
