'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaClock } from 'react-icons/fa'

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState({
    est: '',
    ist: '',
    estDate: '',
    istDate: ''
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      
      // EST (Eastern Standard Time) - UTC-5 or UTC-4 during DST
      const estTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now)
      
      const estDate = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(now)
      
      // IST (India Standard Time) - UTC+5:30
      const istTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now)
      
      const istDate = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(now)
      
      setCurrentTime({
        est: estTime,
        ist: istTime,
        estDate: estDate,
        istDate: istDate
      })
    }

    // Update immediately
    updateTime()
    
    // Update every second
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
    >
      <div className="flex items-center justify-center mb-3">
        <FaClock className="text-white mr-2" />
        <h3 className="text-white font-semibold">Global Time</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        {/* EST Time */}
        <div className="space-y-1">
          <div className="text-primary-200 text-sm font-medium">Eastern Time (EST)</div>
          <div className="text-white text-lg font-bold font-mono">{currentTime.est}</div>
          <div className="text-primary-100 text-xs">{currentTime.estDate}</div>
        </div>
        
        {/* IST Time */}
        <div className="space-y-1">
          <div className="text-primary-200 text-sm font-medium">India Time (IST)</div>
          <div className="text-white text-lg font-bold font-mono">{currentTime.ist}</div>
          <div className="text-primary-100 text-xs">{currentTime.istDate}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default TimeDisplay
