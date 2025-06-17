"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiSearch, FiShoppingCart, FiHeart, FiMapPin, FiClock, FiDollarSign } from "react-icons/fi";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FiSearch size={24} className="text-red-500" />,
      title: "Discover",
      description: "Browse local shops, restaurants, and services tailored to your location."
    },
    {
      icon: <FiShoppingCart size={24} className="text-red-500" />,
      title: "Order",
      description: "Place orders directly through LocalEats for quick delivery or easy pickup."
    },
    {
      icon: <FiHeart size={24} className="text-red-500" />,
      title: "Support",
      description: "Every order helps strengthen your local economy and community businesses."
    }
  ];

  const features = [
    {
      icon: <FiMapPin size={24} className="text-red-500" />,
      title: "Local Focus",
      description: "Only businesses within your community"
    },
    {
      icon: <FiClock size={24} className="text-red-500" />,
      title: "Fast Delivery",
      description: "Quick service from nearby locations"
    },
    {
      icon: <FiDollarSign size={24} className="text-red-500" />,
      title: "Fair Pricing",
      description: "More value stays in your community"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center px-6 py-4 shadow sticky top-0 bg-white z-50"
      >
        <motion.h1 
          whileHover={{ scale: 1.05 }} 
          className="text-2xl font-bold text-red-600 cursor-pointer"
        >
          𝓛𝓸𝓬𝓪𝓵𝓔𝓪𝓽𝓼
        </motion.h1>
        <nav className="flex items-center space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-red-500 transition-colors font-medium">
            Login
          </Link>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 1 }}
          >
            <Link 
              href="/signup" 
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium shadow-md"
            >
              Get Started
            </Link>
          </motion.div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative text-center py-20 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            Discover & Support <span className="text-red-500">Local Businesses</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            LocalEats connects you with nearby shops, restaurants, and services. Support your community while enjoying fresh and fast delivery.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/shops" 
              className="inline-block bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition font-medium shadow-lg text-lg"
            >
              Explore Local Shops
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          How <span className="text-red-500">LocalEats</span> Works
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 text-center">Step {index + 1}: {step.title}</h4>
              <p className="text-gray-600 text-center">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Why Choose <span className="text-red-500">LocalEats</span>?
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center mb-3">
                  <div className="mr-3">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold">{feature.title}</h4>
                </div>
                <p className="text-gray-600 pl-9">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Support Your Community?
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Join thousands of others who are keeping their local economy thriving.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link 
              href="/signup" 
              className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-bold shadow-lg text-lg"
            >
              Get Started
            </Link>
            <Link 
              href="/shops" 
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg hover:bg-red-500 hover:bg-opacity-10 transition font-bold text-lg"
            >
              Browse Shops
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-red-400">𝓛𝓸𝓬𝓪𝓵𝓔𝓪𝓽𝓼</h4>
              <p className="text-gray-400">Supporting local businesses one order at a time.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Company</h5>
              <ul className="space-y-2">
                <li><Link href="" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                <li><Link href="" className="text-gray-400 hover:text-white transition">Careers</Link></li>
                <li><Link href="" className="text-gray-400 hover:text-white transition">Press</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Resources</h5>
              <ul className="space-y-2">
                <li><Link href="" className="text-gray-400 hover:text-white transition">Blog</Link></li>
                <li><Link href="" className="text-gray-400 hover:text-white transition">Help Center</Link></li>
                <li><Link href="" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Legal</h5>
              <ul className="space-y-2">
                <li><Link href="" className="text-gray-400 hover:text-white transition">Privacy</Link></li>
                <li><Link href="" className="text-gray-400 hover:text-white transition">Terms</Link></li>
                <li><Link href="" className="text-gray-400 hover:text-white transition">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2025 LocalEats. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}