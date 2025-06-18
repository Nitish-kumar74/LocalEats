"use client";

import { motion } from "framer-motion";
import { FiSearch, FiHeart, FiShoppingBag, FiAward, FiMapPin, FiShare2 } from "react-icons/fi";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-purple-600 mb-6"
        >
          Discover & Support Local Businesses
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-700 mb-8"
        >
          Your guide to finding hidden gems and helping your community thrive
        </motion.p>
      </section>

      {/* How It Works Steps */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <FiSearch className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Discover</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Browse curated local businesses near you. Filter by category, distance, or special offers.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Restaurants</span>
              <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">Shops</span>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">Services</span>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FiHeart className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Engage</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Save favorites, get updates on specials, and share your finds with friends.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <FiMapPin className="mr-2 text-blue-500" /> Check-in at locations
              </li>
              <li className="flex items-center">
                <FiShare2 className="mr-2 text-green-500" /> Share on social media
              </li>
              <li className="flex items-center">
                <FiHeart className="mr-2 text-red-500" /> Create wishlists
              </li>
            </ul>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FiShoppingBag className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Support</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Shop directly through the app and enjoy exclusive local deals.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-black justify-between bg-gray-50 p-3 rounded-lg">
                <span>Online Orders</span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">NEW</span>
              </div>
              <div className="flex items-center text-black justify-between bg-gray-50 p-3 rounded-lg">
                <span>Gift Cards</span>
              </div>
              <div className="flex items-center text-black justify-between bg-gray-50 p-3 rounded-lg">
                <span>Local Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Rewards Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
        >
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <FiAward className="text-yellow-300 text-2xl mr-3" />
                <h3 className="text-2xl font-bold">Local Rewards</h3>
              </div>
              <p className="mb-4">
                Earn points with every purchase and redeem them for exclusive perks at your favorite spots.
              </p>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100">
                Join the Program
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">5X</div>
                  <div className="text-sm">Points this weekend</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA - Corrected Link Implementation */}
        <div className="text-center mt-20">
          <Link href="/shops" passHref legacyBehavior>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-purple-700 cursor-pointer"
            >
              Start Exploring Local Businesses
            </motion.a>
          </Link>
        </div>
      </section>
    </div>
  );
}