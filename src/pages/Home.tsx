import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { Image as ImageIcon, Star, Truck, Shield, Clock, Mail, ChevronDown } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-150 global-font">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-gradient-to-r from-blue-300/90 to-green-200/90">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1596825205490-7263b87acf8b?auto=format&fit=crop&q=80&w=2000"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 font-serif mb-6">
              Transform Your Photos Into Stunning Magnets
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Create personalized magnetic memories that bring your favorite moments to life. Perfect for gifts, decoration, or keeping cherished photos close.
            </p>
            <Link
              to="/product/set-of-6"
              className="inline-block bg-[#456789] text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-[#456789] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Creating
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Why Choose Our Magnets?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
              Experience premium quality and exceptional service with every order
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Feature Cards */}
            {[{
              icon: <ImageIcon className="h-8 w-8 text-green-500" />,
              title: "Premium Quality",
              description: "High-resolution printing on premium magnetic material"
            }, {
              icon: <Star className="h-8 w-8 text-blue-400" />,
              title: "Easy to Create",
              description: "Simple upload and customization process"
            }, {
              icon: <Truck className="h-8 w-8 text-green-400" />,
              title: "Fast Shipping",
              description: "Quick production and worldwide delivery"
            }, {
              icon: <Shield className="h-8 w-8 text-blue-500" />,
              title: "Satisfaction Guaranteed",
              description: "Love your magnets or get your money back"
            }].map((feature, index) => (
              <div
                key={index}
                className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-200 mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Our Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
              Choose from our selection of premium photo magnets
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="aspect-square overflow-hidden rounded-t-3xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-800">RM {product.price}</span>
                    <span className="bg-[#456789] text-white px-6 py-2 rounded-full text-sm font-medium group-hover:br-[#234567] transition-all duration-300">
                      Order Now
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
