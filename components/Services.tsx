'use client'

import { motion } from 'framer-motion'
import { FaCode, FaMobile, FaRocket, FaShoppingCart, FaPalette, FaSearch } from 'react-icons/fa'

const Services = () => {
  const services = [
    {
      icon: <FaCode />,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.',
      features: ['Responsive Design', 'Performance Optimization', 'SEO Friendly', 'Cross-browser Compatible']
    },
    {
      icon: <FaMobile />,
      title: 'Mobile-First Design',
      description: 'Mobile-optimized websites that provide exceptional user experience across all devices.',
      features: ['Touch-Friendly UI', 'Fast Loading', 'Progressive Web Apps', 'Mobile Analytics']
    },
    {
      icon: <FaShoppingCart />,
      title: 'E-commerce Solutions',
      description: 'Complete e-commerce platforms with secure payment processing and inventory management.',
      features: ['Payment Integration', 'Inventory Management', 'Order Tracking', 'Analytics Dashboard']
    },
    {
      icon: <FaPalette />,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive designs that engage users and drive conversions.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
    },
    {
      icon: <FaRocket />,
      title: 'Performance Optimization',
      description: 'Speed optimization and performance tuning to ensure lightning-fast loading times.',
      features: ['Core Web Vitals', 'Image Optimization', 'Caching Strategies', 'CDN Integration']
    },
    {
      icon: <FaSearch />,
      title: 'SEO & Marketing',
      description: 'Search engine optimization and digital marketing to boost your online visibility.',
      features: ['Technical SEO', 'Content Strategy', 'Analytics Setup', 'Local SEO']
    }
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive web development services to help your business thrive in the digital landscape.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-xl text-2xl mb-6">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-12">Our Development Process</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your goals and requirements' },
              { step: '02', title: 'Design', description: 'Creating wireframes and visual designs' },
              { step: '03', title: 'Development', description: 'Building your solution with best practices' },
              { step: '04', title: 'Launch', description: 'Testing, deployment, and ongoing support' }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-4xl font-bold text-primary-600 mb-2">{phase.step}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{phase.title}</h4>
                  <p className="text-gray-600 text-sm">{phase.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-300 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
