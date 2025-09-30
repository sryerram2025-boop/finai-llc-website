// Weather Service for FinAI LLC Website
// This service provides weather data and can be extended to use real APIs

export interface CurrentWeather {
  temp: number
  condition: string
  humidity: number
  windSpeed: number
  visibility: number
  icon: string
  feelsLike: number
  uvIndex: number
}

export interface WeatherForecast {
  date: string
  day: string
  high: number
  low: number
  condition: string
  icon: string
  precipitation: number
  windSpeed: number
  humidity: number
}

export interface WeatherData {
  location: string
  current: CurrentWeather
  forecast: WeatherForecast[]
  lastUpdated: string
}

class WeatherService {
  private static instance: WeatherService
  private cache: Map<string, { data: WeatherData; timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

  private constructor() {}

  static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService()
    }
    return WeatherService.instance
  }

  /**
   * Get weather data for a specific location
   * @param location - City name or coordinates
   * @returns Promise<WeatherData>
   */
  async getWeatherData(location: string = 'Pittsburgh, PA'): Promise<WeatherData> {
    // Check cache first
    const cached = this.cache.get(location)
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      // In production, replace this with actual API calls
      const weatherData = await this.fetchMockWeatherData(location)
      
      // Cache the result
      this.cache.set(location, {
        data: weatherData,
        timestamp: Date.now()
      })

      return weatherData
    } catch (error) {
      console.error('Error fetching weather data:', error)
      throw new Error('Failed to fetch weather data')
    }
  }

  /**
   * Mock weather data generator
   * Replace this with actual API integration (OpenWeatherMap, WeatherAPI, etc.)
   */
  private async fetchMockWeatherData(location: string): Promise<WeatherData> {
    // Simulate API delay (reduced for better UX)
    await new Promise(resolve => setTimeout(resolve, 200))

    const baseTemp = location.toLowerCase().includes('pittsburgh') ? 45 : 50
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Snow']
    const icons = ['sunny', 'partly-cloudy', 'cloudy', 'rainy', 'snowy']

    // Generate current weather
    const currentConditionIndex = Math.floor(Math.random() * conditions.length)
    const current: CurrentWeather = {
      temp: baseTemp + Math.floor(Math.random() * 10) - 5,
      condition: conditions[currentConditionIndex],
      humidity: 50 + Math.floor(Math.random() * 30),
      windSpeed: 5 + Math.floor(Math.random() * 15),
      visibility: 8 + Math.floor(Math.random() * 5),
      icon: icons[currentConditionIndex],
      feelsLike: baseTemp + Math.floor(Math.random() * 8) - 4,
      uvIndex: Math.floor(Math.random() * 10) + 1
    }

    // Generate 7-day forecast
    const forecast: WeatherForecast[] = []
    const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      
      const conditionIndex = Math.floor(Math.random() * conditions.length)
      const high = baseTemp + Math.floor(Math.random() * 15) - 5
      const low = high - (10 + Math.floor(Math.random() * 10))

      forecast.push({
        date: date.toISOString().split('T')[0],
        day: i < days.length ? days[i] : date.toLocaleDateString('en-US', { weekday: 'long' }),
        high,
        low,
        condition: conditions[conditionIndex],
        icon: icons[conditionIndex],
        precipitation: Math.floor(Math.random() * 100),
        windSpeed: 3 + Math.floor(Math.random() * 12),
        humidity: 40 + Math.floor(Math.random() * 40)
      })
    }

    return {
      location,
      current,
      forecast,
      lastUpdated: new Date().toISOString()
    }
  }

  /**
   * Get weather for multiple locations
   */
  async getMultiLocationWeather(locations: string[]): Promise<WeatherData[]> {
    const promises = locations.map(location => this.getWeatherData(location))
    return Promise.all(promises)
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear()
  }

  /**
   * Integration ready method for real weather APIs
   * Uncomment and configure when ready to use real APIs
   */
  /*
  private async fetchRealWeatherData(location: string): Promise<WeatherData> {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=imperial`
    
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Transform API response to our WeatherData format
    return this.transformApiResponse(data)
  }
  */
}

export default WeatherService.getInstance()
