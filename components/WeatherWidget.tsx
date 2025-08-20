'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCloud, FaSun, FaCloudRain, FaSnowflake, FaThermometerHalf, FaEye, FaWind } from 'react-icons/fa'
import weatherService, { WeatherData } from '../lib/weatherService'

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentLocation, setCurrentLocation] = useState('Pittsburgh, PA')

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      
      try {
        const data = await weatherService.getWeatherData('Pittsburgh, PA')
        setWeatherData(data)
        setCurrentLocation(data.location)
      } catch (error) {
        console.error('Failed to fetch weather data:', error)
        // Handle error gracefully
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
    
    // Refresh weather data every 10 minutes
    const interval = setInterval(fetchWeatherData, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (iconType: string) => {
    const iconProps = { size: 24, className: "text-white" }
    
    switch (iconType) {
      case 'sunny':
        return <FaSun {...iconProps} className="text-yellow-300" />
      case 'partly-cloudy':
        return <FaCloud {...iconProps} className="text-gray-300" />
      case 'cloudy':
        return <FaCloud {...iconProps} className="text-gray-400" />
      case 'rainy':
        return <FaCloudRain {...iconProps} className="text-blue-300" />
      case 'snowy':
        return <FaSnowflake {...iconProps} className="text-white" />
      default:
        return <FaSun {...iconProps} />
    }
  }

  const getSmallWeatherIcon = (iconType: string) => {
    const iconProps = { size: 16 }
    
    switch (iconType) {
      case 'sunny':
        return <FaSun {...iconProps} className="text-yellow-400" />
      case 'partly-cloudy':
        return <FaCloud {...iconProps} className="text-gray-400" />
      case 'cloudy':
        return <FaCloud {...iconProps} className="text-gray-500" />
      case 'rainy':
        return <FaCloudRain {...iconProps} className="text-blue-400" />
      case 'snowy':
        return <FaSnowflake {...iconProps} className="text-blue-200" />
      default:
        return <FaSun {...iconProps} />
    }
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="text-white text-sm mt-2">Loading weather...</p>
        </div>
      </motion.div>
    )
  }

  if (!weatherData) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 max-w-sm"
    >
      {/* Current Weather */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center mb-2">
          <FaThermometerHalf className="text-white mr-2" />
          <h3 className="text-white font-semibold">Weather</h3>
        </div>
        <p className="text-primary-200 text-sm mb-2">{currentLocation}</p>
        
        <div className="flex items-center justify-center mb-2">
          {getWeatherIcon(weatherData.current.icon)}
          <span className="text-2xl font-bold text-white ml-2">
            {weatherData.current.temp}°F
          </span>
        </div>
        
        <p className="text-primary-100 text-sm mb-3">{weatherData.current.condition}</p>
        
        {/* Current Weather Details */}
        <div className="grid grid-cols-3 gap-2 text-xs text-primary-100">
          <div className="flex flex-col items-center">
            <FaEye className="mb-1" />
            <span>{weatherData.current.visibility}mi</span>
          </div>
          <div className="flex flex-col items-center">
            <FaWind className="mb-1" />
            <span>{weatherData.current.windSpeed}mph</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-blue-300 mb-1">💧</span>
            <span>{weatherData.current.humidity}%</span>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="border-t border-white/20 pt-3">
        <h4 className="text-white text-sm font-medium mb-3 text-center">7-Day Forecast</h4>
        <div className="space-y-2">
          {weatherData.forecast.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center space-x-2 flex-1">
                {getSmallWeatherIcon(day.icon)}
                <span className="text-primary-100 text-xs font-medium min-w-[60px]">
                  {day.day}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-primary-200 text-xs">
                  {day.precipitation}%
                </span>
                <div className="text-white text-xs font-medium min-w-[40px] text-right">
                  <span className="text-white">{day.high}°</span>
                  <span className="text-primary-300 ml-1">{day.low}°</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Last Updated */}
      <div className="border-t border-white/20 pt-2 mt-3">
        <p className="text-primary-200 text-xs text-center">
          Updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  )
}

export default WeatherWidget
