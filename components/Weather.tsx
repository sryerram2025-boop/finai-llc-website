'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaLocationDot, FaEye, FaWind, FaDroplet } from 'react-icons/fa6'
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiNightClear } from 'react-icons/wi'

interface WeatherData {
  location: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  visibility: number
  icon: string
  feelsLike: number
}

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      '01d': <WiDaySunny className="text-yellow-500" />,
      '01n': <WiNightClear className="text-blue-300" />,
      '02d': <WiCloudy className="text-gray-400" />,
      '02n': <WiCloudy className="text-gray-500" />,
      '03d': <WiCloudy className="text-gray-400" />,
      '03n': <WiCloudy className="text-gray-500" />,
      '04d': <WiCloudy className="text-gray-500" />,
      '04n': <WiCloudy className="text-gray-600" />,
      '09d': <WiRain className="text-blue-500" />,
      '09n': <WiRain className="text-blue-600" />,
      '10d': <WiRain className="text-blue-500" />,
      '10n': <WiRain className="text-blue-600" />,
      '11d': <WiThunderstorm className="text-purple-600" />,
      '11n': <WiThunderstorm className="text-purple-700" />,
      '13d': <WiSnow className="text-blue-200" />,
      '13n': <WiSnow className="text-blue-300" />,
    }
    return iconMap[iconCode] || <WiDaySunny className="text-yellow-500" />
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords
              
              // Using OpenWeatherMap API (free tier)
              const API_KEY = 'demo_key' // You'll need to get a real API key
              const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
              )
              
              if (!response.ok) {
                // Fallback to demo data if API fails
                setWeather({
                  location: 'Pittsburgh, PA',
                  temperature: 22,
                  description: 'Partly Cloudy',
                  humidity: 65,
                  windSpeed: 8,
                  visibility: 10,
                  icon: '02d',
                  feelsLike: 25
                })
                setLoading(false)
                return
              }
              
              const data = await response.json()
              setWeather({
                location: `${data.name}, ${data.sys.country}`,
                temperature: Math.round(data.main.temp),
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
                visibility: Math.round(data.visibility / 1000), // Convert m to km
                icon: data.weather[0].icon,
                feelsLike: Math.round(data.main.feels_like)
              })
              setLoading(false)
            },
            () => {
              // Location denied, use demo data
              setWeather({
                location: 'Pittsburgh, PA',
                temperature: 22,
                description: 'Partly Cloudy',
                humidity: 65,
                windSpeed: 8,
                visibility: 10,
                icon: '02d',
                feelsLike: 25
              })
              setLoading(false)
            }
          )
        } else {
          // Geolocation not supported, use demo data
          setWeather({
            location: 'Pittsburgh, PA',
            temperature: 22,
            description: 'Partly Cloudy',
            humidity: 65,
            windSpeed: 8,
            visibility: 10,
            icon: '02d',
            feelsLike: 25
          })
          setLoading(false)
        }
      } catch (err) {
        setError('Unable to fetch weather data')
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded mb-4"></div>
          <div className="h-8 bg-white/20 rounded mb-2"></div>
          <div className="h-4 bg-white/20 rounded"></div>
        </div>
      </motion.div>
    )
  }

  if (error || !weather) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center"
      >
        <p className="text-white/80">Weather data unavailable</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-white/80">
          <FaLocationDot className="mr-2 text-sm" />
          <span className="text-sm font-medium">{weather.location}</span>
        </div>
        <div className="text-4xl">
          {getWeatherIcon(weather.icon)}
        </div>
      </div>

      {/* Temperature */}
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-white">{weather.temperature}°</span>
          <span className="text-white/60 ml-1">C</span>
        </div>
        <p className="text-white/80 text-sm capitalize">{weather.description}</p>
        <p className="text-white/60 text-xs">Feels like {weather.feelsLike}°C</p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-3 gap-4 text-white/70">
        <div className="text-center">
          <FaDroplet className="mx-auto mb-1 text-blue-300" />
          <div className="text-xs font-medium">{weather.humidity}%</div>
          <div className="text-xs opacity-75">Humidity</div>
        </div>
        <div className="text-center">
          <FaWind className="mx-auto mb-1 text-green-300" />
          <div className="text-xs font-medium">{weather.windSpeed} km/h</div>
          <div className="text-xs opacity-75">Wind</div>
        </div>
        <div className="text-center">
          <FaEye className="mx-auto mb-1 text-purple-300" />
          <div className="text-xs font-medium">{weather.visibility} km</div>
          <div className="text-xs opacity-75">Visibility</div>
        </div>
      </div>
    </motion.div>
  )
}

export default Weather
