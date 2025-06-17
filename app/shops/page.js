//shops/page.js
'use client'; // Required for using React hooks in Next.js

import { useState } from 'react';
import Link from 'next/link';



const shops = [
  { 
    id: 1,
    name: "Jodhpur Misthan Bhandar", 
    category: "Sweets & Snacks", 
    location: "Bypass Baragaon",
    rating: 4.5,
    image: "/shop1.avif"
  },
  { 
    id: 2,
    name: "Sonu Monu Restaurant", 
    category: "Snacks & Sweets", 
    location: "College Stand Baragaon",
    rating: 4.2,
    image: "/shop2.jpg"
  },
  { 
    id: 3,
    name: "Hari misthan bhandar", 
    category: "Snacks & Sweets & coldrinks", 
    location: "College Stand Baragaon",
    rating: 4.2,
    image: "/shop3.jpg"
  },
  { 
    id: 4,
    name: "Chotmal Chat Bhander", 
    category: "Samosas & Kachori", 
    location: "Bypass Stand Baragaon",
    rating: 4.2,
    image: "/shop4.avif"
  },
  { 
    id: 5,
    name: "Natraj misthan Bhander", 
    category: "General store & Sweets", 
    location: "Near Mosque Baragoan",
    rating: 4.2,
    image: "/shop5.jpg"
  },
  { 
    id: 6,
    name: "Mahakal Fast Food", 
    category: "Restaurant", 
    location: "Bhlodhiya Complex Baragaon",
    rating: 4.2,
    image: "/shop6.jpg"
  },
  { 
    id: 7,
    name: "Kanika Fast Food", 
    category: "Cakes & Snacks", 
    location: "Baragaon",
    rating: 4.2,
    image: "/shop7.jpg"
  },
  { 
    id: 8,
    name: "Lavish Pizza Point", 
    category: "Pizza", 
    location: "Bhalodhiya Complex Baragaon",
    rating: 4.2,
    image: "/shop8.jpg"
  },
  { 
    id: 9,
    name: "Power house gym", 
    category: "GYM", 
    location: "Near Pan Shop Baragaon",
    rating: 4.2,
    image: "/gym9.jpg"
  },
  { 
    id: 10,
    name: "Pawen Pan Shop", 
    category: "Pan Masala", 
    location: "Near Centrel Bank Baragaon",
    rating: 4.2,
    image: "/shop10.avif"
  },
  { 
    id: 11,
    name: "Prince Library & Tution Center", 
    category: "Education", 
    location: "Hansalsar Stend Baragaon",
    rating: 5,
    image: "/shop11.webp"
  },
  { 
    id: 12,
    name: "Study Point LIbrary", 
    category: "Education", 
    location: "Hansalsar Stend Baragaon",
    rating: 4.2,
    image: "/shop12.jpg"
  },
  { 
    id: 13,
    name: "Success Library", 
    category: "Education", 
    location: "Bhalodhiya Complex Baragaon",
    rating: 4.2,
    image: "/shop13.avif"
  },
  { 
    id: 14,
    name: "SDR Library", 
    category: "Education", 
    location: "Centrel Bank Baragaon",
    rating: 4.2,
    image: "/shop14.jpg"
  },
  { 
    id: 15,
    name: "Vinayek library", 
    category: "Education", 
    location: "Baroda Bank Baragaon",
    rating: 4.2,
    image: "/shop15.avif"
  }
];

export default function Shops() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Filter shops based on search term, category, and location
  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || 
                          shop.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const matchesLocation = selectedLocation === '' || 
                           shop.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Get unique categories and locations for dropdowns
  const categories = [...new Set(shops.map(shop => shop.category))];
  const locations = [...new Set(shops.map(shop => shop.location))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Nearby Shops
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Discover the best local shops in Baragaon
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search shops..."
              className="w-full text-black p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select 
              className="w-full text-black p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <select 
              className="w-full text-black p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-gray-600">
          Showing {filteredShops.length} of {shops.length} shops
        </div>

        {/* Shops Grid */}
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredShops.map((shop) => (
              <div 
                key={shop.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                {/* Shop Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={shop.image} 
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{shop.name}</h2>
                    <div className="flex items-center bg-red-100 px-2 py-1 rounded-full">
                      <svg className="h-4 w-4 text-red-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-red-800">{shop.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      {shop.category}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {shop.location}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link href={`/shops/${shop.id}`}>
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No shops found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}