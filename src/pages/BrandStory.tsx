import React from 'react';
import { PrinterIcon, ImageIcon, HeartIcon, HistoryIcon } from 'lucide-react';

const BrandStory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50">
      {/* Hero Section with Diagonal Design */}
      <div className="relative h-96 overflow-hidden bg-gradient-to-r from-blue-300/90 to-green-200/90 skew-y-3 transform -mt-20">
        <div className="absolute inset-0 -skew-y-3 transform flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl font-bold mb-6 text-gray-800 font-serif">
              Capturing Moments in Magnets
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto italic">
              Where your memories become magnetic masterpieces
            </p>
          </div>
        </div>
      </div>

      {/* Story Section with Curved Design */}
      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
            <h2 className="text-3xl font-serif mb-6 text-gray-800">Our Sweet Beginning</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In a world filled with fleeting moments, I discovered a way to make memories last longer—by turning them into something tangible, beautiful, and uniquely yours. My journey began with a simple idea: what if we could carry our favorite memories with us, not just in our hearts but in our everyday lives?
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              That’s how my passion for creating custom magnets was born. Each magnet I craft tells a story, your story. Whether it’s a family portrait, a special celebration, or a snapshot of your favorite place, I turn it into a keepsake that can brighten up your home, office, or any space you cherish.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your memories, your magnets—crafted with care, made just for you.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-cyan-100 h-48 rounded-full"></div>
            <div className="bg-teal-100 h-64 rounded-full mt-12"></div>
            <div className="bg-blue-100 h-64 rounded-full -mt-12"></div>
            <div className="bg-teal-200 h-48 rounded-full"></div>
          </div>
        </div>

        {/* Features Section with Floating Cards */}
        <div className="mb-32">
          <h2 className="text-4xl font-serif text-center mb-16 text-gray-800">What Makes Us Special</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300">
              <PrinterIcon className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h3 className="text-2xl font-serif mb-3 text-gray-800">Premium Quality</h3>
              <p className="text-gray-600">
                Using state-of-the-art printing technology and highest-grade magnetic materials for exceptional clarity and durability.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 mt-8">
              <ImageIcon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-serif mb-3 text-gray-800">Custom Solutions</h3>
              <p className="text-gray-600">
                From family photos to business promotions, we create personalized magnets in various sizes and shapes.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300">
              <HeartIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-serif mb-3 text-gray-800">Customer Care</h3>
              <p className="text-gray-600">
                Dedicated support team ensuring your satisfaction from design to delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="relative mb-32">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300/90 to-green-200/90 rounded-3xl -rotate-3 transform"></div>
          <div className="relative bg-white/60 backdrop-blur-sm p-12 rounded-3xl">
            <h2 className="text-4xl font-serif text-center mb-12 text-gray-800">Our Magical Collection</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-serif mb-4 text-gray-800">Photo Magnets</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our signature photo magnets are perfect for preserving family moments, celebrating special occasions, or creating unique gifts.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-4 text-gray-800">Business Magnets</h3>
                <p className="text-gray-700 leading-relaxed">
                  For businesses, we create eye-catching promotional magnets that help keep your brand visible.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-20">
          <div className="bg-gradient-to-r from-blue-300/90 to-green-200/90 p-12 rounded-3xl shadow-lg">
            <h2 className="text-4xl font-serif mb-6 text-gray-800">Ready to Create Your Magnetic Story?</h2>
            <button
              className="bg-[#456789] text-white px-12 py-4 rounded-full text-lg hover:bg-[#56789A] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandStory;
