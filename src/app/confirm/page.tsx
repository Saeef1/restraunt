"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";



const ConfirmOrderPage = () => {
  const { cartItems } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setOrderId(`ORD-${Math.floor(Math.random() * 1000000)}`);
    setIsHydrated(true);
  }, []);

  const safeCartItems = cartItems || [];
  
  const subtotal = safeCartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const serviceCost = 2.0;
  const deliveryCost = subtotal > 50 ? 0 : 5.0;
  const total = subtotal + serviceCost + deliveryCost;
  
  const totalItems = safeCartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Preparing your order...</p>
        </div>
      </div>
    );
  }

  if (safeCartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-bold text-red-500">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        {/* <svg 
          className="w-16 h-16 text-green-500 mx-auto" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M5 13l4 4L19 7"
          ></path>
        </svg> */}
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Order Confirmed!</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order {orderId && `(#${orderId})`} has been placed successfully.
        </p>
      </div>

      <div className="border-t border-b border-gray-200 py-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
        
        {/* Cart Items List */}
        <div className="mb-6">
          {safeCartItems.map(item => (
            <div key={item._id} className="flex items-center mb-4 p-3 border-b border-gray-100">
              <div className="relative w-20 h-20">
                <Image 
                  src={item.image} 
                  alt={item.name || "Product image"} 
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              <div className="flex-1 ml-4">
                <h3 className="font-bold">{item.name}</h3>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Qty: {item.quantity}</span>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary Details */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Items ({totalItems}):</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee:</span>
            <span>${serviceCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>${deliveryCost.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 font-bold text-lg">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">What&apos;s Next?</h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Order confirmation sent to your email</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Preparing your order for delivery</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Estimated delivery: 30-45 minutes</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          onClick={() => window.location.href = '/orders'}
        >
          View Order Status
        </button>
        <p className="mt-4 text-gray-600">
          Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact support</a>
        </p>
      </div>
    </div>
  );
};

export default ConfirmOrderPage;