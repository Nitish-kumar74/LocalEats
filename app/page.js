"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiShoppingCart,
  FiMapPin,
  FiClock,
  FiHeart,
  FiStar,
  FiChevronRight,
  FiAward,
  FiTruck,
  FiShield,
} from "react-icons/fi";

export default function Home() {
  const categories = ["All", "Groceries", "Restaurants", "Bakeries", "Farmers", "Specialty"];

  const initialShops = [
    {
      id: 1,
      name: "Fresh Market",
      category: "Groceries",
      rating: 4.8,
      deliveryTime: "30-45 min",
      distance: "0.8 miles",
      isFavorite: true,
      image: "/fresh.jpeg",
      featured: true,
      description: "Organic produce and pantry staples from local farms"
    },
    {
      id: 2,
      name: "Pasta Palace",
      category: "Restaurants",
      rating: 4.6,
      deliveryTime: "25-35 min",
      distance: "1.2 miles",
      isFavorite: false,
      image: "/pasta.avif",
      featured: false,
      description: "Authentic Italian pasta dishes made fresh daily"
    },
    {
      id: 3,
      name: "Sweet Dreams Bakery",
      category: "Bakeries",
      rating: 4.9,
      deliveryTime: "20-30 min",
      distance: "0.5 miles",
      isFavorite: true,
      image: "/sweet.webp",
      featured: true,
      description: "Artisanal breads and pastries baked with local ingredients"
    },
    {
      id: 4,
      name: "Green Valley Farms",
      category: "Farmers",
      rating: 4.7,
      deliveryTime: "40-50 min",
      distance: "2.1 miles",
      isFavorite: false,
      image: "/green.jpg",
      featured: true,
      description: "Seasonal produce and dairy from our family farm"
    },
    {
      id: 5,
      name: "Spice Route",
      category: "Specialty",
      rating: 4.5,
      deliveryTime: "35-45 min",
      distance: "1.5 miles",
      isFavorite: false,
      image: "/spice.jpg",
      featured: false,
      description: "Exotic spices and international gourmet ingredients"
    },
    {
      id: 6,
      name: "Burger Barn",
      category: "Restaurants",
      rating: 4.3,
      deliveryTime: "15-25 min",
      distance: "0.7 miles",
      isFavorite: false,
      image: "/burger.jpg",
      featured: false,
      description: "Gourmet burgers with locally sourced beef"
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredShops, setFeaturedShops] = useState(initialShops);

  const toggleFavorite = (id) => {
    setFeaturedShops((prev) =>
      prev.map((shop) =>
        shop.id === id ? { ...shop, isFavorite: !shop.isFavorite } : shop
      )
    );
  };

  const filteredShops = featuredShops.filter(
    (shop) =>
      (activeCategory === "All" || shop.category === activeCategory) &&
      shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredItems = featuredShops.filter(shop => shop.featured);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navigation Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center px-4 sm:px-8 py-4 shadow-sm sticky top-0 bg-white z-50"
      >
        <div className="flex items-center space-x-4">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent cursor-pointer"
          >
            LocalEats
          </motion.h1>
          <nav className="hidden md:flex space-x-6">
            <Link href="shops" className="text-gray-600 hover:text-red-500 transition-colors font-medium">
              Explore
            </Link>
            <Link href="/how" className="text-gray-600 hover:text-red-500 transition-colors font-medium">
              How It Works
            </Link>
            <Link href="/business" className="text-gray-600 hover:text-red-500 transition-colors font-medium">
              For Businesses
            </Link>
            <Link href="/payment" className="text-gray-600 hover:text-red-500 transition-colors font-medium">
            Payment
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
          >
            <FiSearch className="text-xl" />
            <span>Search</span>
          </motion.button>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/signup" className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all">
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-red-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
            >
              Discover & Support <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Local Businesses
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Fresh products, fast delivery, and the satisfaction of keeping your community thriving
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link 
                  href="/shops" 
                  className="flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Find Shops Near You
                  <FiChevronRight className="ml-2" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link 
                  href="/join" 
                  className="flex items-center justify-center px-8 py-4 rounded-full bg-white text-gray-800 font-medium shadow-lg hover:shadow-xl transition-all border border-gray-200"
                >
                  List Your Business
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-red-100 text-red-500 mr-4">
                  <FiAward className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold">Quality Products</h3>
              </div>
              <p className="text-gray-600">
                Discover hand-picked local businesses offering the freshest and highest quality products in your area.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-orange-100 text-orange-500 mr-4">
                  <FiTruck className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold">Fast Delivery</h3>
              </div>
              <p className="text-gray-600">
                Get your orders delivered quickly by local drivers who know the area best.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                  <FiShield className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold">Community Impact</h3>
              </div>
              <p className="text-gray-600">
                Every purchase supports local families and keeps money circulating in your community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Shops Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-gray-900"
            >
              Featured Local Shops
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Hand-selected businesses offering exceptional products and service
            </motion.p>
          </div>

          {/* Featured Shops Carousel */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {featuredItems.map((shop) => (
              <motion.div
                key={shop.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-60 w-full">
                  <Image
                    src={shop.image}
                    alt={`${shop.name} image`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <button
                    onClick={() => toggleFavorite(shop.id)}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
                    aria-label="Toggle Favorite"
                  >
                    <FiHeart
                      className={
                        shop.isFavorite
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }
                    />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xl font-bold text-white">{shop.name}</h4>
                        <p className="text-gray-200">{shop.category}</p>
                      </div>
                      <div className="flex items-center bg-white/90 text-gray-800 px-2 py-1 rounded-full text-sm">
                        <FiStar className="mr-1 text-yellow-500" />
                        {shop.rating}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{shop.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiMapPin className="mr-1" />
                      {shop.distance}
                    </div>
                    <div className="flex items-center">
                      <FiClock className="mr-1" />
                      {shop.deliveryTime}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link 
                href="/shops" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              >
                View All Shops
                <FiChevronRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* All Shops Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-2"
            >
              Browse Local Shops
            </motion.h2>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              {/* Search Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative flex-grow max-w-2xl"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search shops, categories, or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex-shrink-0"
              >
                <select 
                  className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Shop Cards */}
          {filteredShops.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredShops.map((shop) => (
                <motion.div
                  key={shop.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={shop.image}
                      alt={`${shop.name} image`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <button
                      onClick={() => toggleFavorite(shop.id)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                      aria-label="Toggle Favorite"
                    >
                      <FiHeart
                        className={
                          shop.isFavorite
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400"
                        }
                      />
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-semibold">{shop.name}</h4>
                      <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        <FiStar className="mr-1" />
                        {shop.rating}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{shop.category}</p>
                    <p className="text-gray-700 text-sm mb-4">{shop.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiMapPin className="mr-1" />
                        {shop.distance}
                      </div>
                      <div className="flex items-center">
                        <FiClock className="mr-1" />
                        {shop.deliveryTime}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <h3 className="text-xl font-medium text-gray-700">No shops found matching your criteria</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-6"
          >
            Ready to support your local economy?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            Join thousands of customers who are discovering amazing local businesses in their area.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link 
                href="/signup" 
                className="flex items-center justify-center px-8 py-4 rounded-full bg-white text-red-600 font-bold shadow-lg hover:shadow-xl transition-all"
              >
               <p>It&apos;s free to sign up!</p>

              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link 
                href="/business" 
                className="flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white font-bold hover:bg-white/10 transition-colors"
              >
                Learn About Selling With Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <h4 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">LocalEats</h4>
              <p className="text-gray-400 mb-6">Connecting communities with their local businesses since 2025.</p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-lg mb-4">For Shoppers</h5>
              <ul className="space-y-3 text-gray-400">
                {['Browse Shops', 'How It Works', 'Gift Cards', 'FAQs'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-lg mb-4">For Businesses</h5>
              <ul className="space-y-3 text-gray-400">
                {['Add Your Shop', 'Business Hub', 'Seller Resources', 'Success Stories'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-lg mb-4">Company</h5>
              <ul className="space-y-3 text-gray-400">
                {['About Us', 'Careers', 'Press', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © 2025 LocalEats. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}