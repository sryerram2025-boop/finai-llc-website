'use client'

import { motion } from 'framer-motion'
import { FaArrowRight, FaPlay } from 'react-icons/fa'
import TimeDisplay from './TimeDisplay'
import WeatherWidget from './WeatherWidget'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Pittsburgh Downtown Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1605364517221-ed2b28b6b37b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")`,
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-primary-600/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8"
          >
            💳 Smarter ISO 20022 Payments
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Financial AI
            <span className="block gradient-text">
              Solutions
            </span>
            That Scale
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-primary-100 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Revolutionizing payment systems with AI-powered ISO 20022 solutions. Building secure, compliant, and intelligent financial technology for the modern economy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-secondary-500 text-white font-semibold rounded-full hover:bg-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Your Project
              <FaArrowRight className="ml-2" />
            </motion.a>
            
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              <FaPlay className="mr-2" />
              View Our Work
            </motion.a>
          </motion.div>

          {/* Time and Weather Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-16 flex flex-col lg:flex-row gap-6 justify-center items-center"
          >
            <TimeDisplay />
            <WeatherWidget />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-primary-200">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-primary-200">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">5+</div>
              <div className="text-primary-200">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>
      </div>



      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"
      />
      
      <motion.div
        animate={{
          y: [20, -20, 20],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-500/10 rounded-full blur-xl"
      />
    </section>
  )
}

export default Hero
