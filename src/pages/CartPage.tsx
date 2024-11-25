import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, Edit2 } from 'lucide-react';
import { products } from '../data/products';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  const handleEdit = (productId: string, images: string[]) => {
    navigate(`/product/${productId}`, {
      state: { editMode: true, existingImages: images },
    });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-teal-50 to-blue-50 global-font">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-700">Add some products to your cart to continue shopping.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-[#456789] text-white rounded-md hover:bg-[#456789]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-teal-50 to-teal-150 global-font">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;
            return (
              <div key={item.productId} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.images[0] || product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-gray-600">${product.price}</p>

                    <div className="mt-2 flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="p-1 rounded-md hover:bg-teal-100"
                      >
                        <Minus className="h-4 w-4 text-teal-600" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1 rounded-md hover:bg-teal-100"
                      >
                        <Plus className="h-4 w-4 text-teal-600" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleEdit(item.productId, item.images)}
                      className="p-2 text-teal-600 hover:text-teal-800"
                      title="Edit item"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-2 text-gray-400 hover:text-red-500"
                      title="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {item.images.length > 1 && (
                  <div className="mt-4 border-t border-gray-300 pt-4">
                    <p className="text-sm text-gray-600 mb-2">All Images:</p>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {item.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Image ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between text-base">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3 px-6 bg-[#456789] text-white rounded-md hover:bg-[#456789] transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
