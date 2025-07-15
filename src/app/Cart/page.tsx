"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cartItems, changeQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const serviceCost = 0;
  const deliveryCost = 0;
  const total = subtotal + serviceCost + deliveryCost;
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      router.push('/payment');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="h-[calc(100vh-6rem)] w-full flex flex-col items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bebas mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8">Add some delicious items to get started!</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bebas text-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=" h-[calc(100vh-6rem)] lg:flex-row md:h-[calc(100vh-6rem)] flex flex-col items-center text-white">
        <div className=" h-1/2 p-4 flex flex-col justify-center overflow-scroll md:h-full md:mt-7 lg:w-2/3 lg:px-10 xl:px-40">
          {cartItems.map((item) => (
            <div 
              key={item._id}
              className="w-full flex items-center justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-4 mb-4"
            >
              <div className="flex items-center gap-4">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  width={80} 
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h1 className="uppercase text-xl font-bold text-white">{item.name}</h1>
                  <div className="text-yellow-400 font-bold">Rs {item.price}/-</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => changeQuantity(item._id, -1)}
                    disabled={item.quantity <= 1}
                    className="px-3 py-1  text-white rounded disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="min-w-[30px] text-center font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => changeQuantity(item._id, +1)}
                    disabled={item.quantity >= 10}
                    className="px-3 py-1  text-white rounded  disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg">Rs {item.price * item.quantity}/-</div>
                  <div className="text-sm text-gray-400">{item.quantity} × Rs {item.price}</div>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-400 transition-colors p-2"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          
          {cartItems.length > 0 && (
            <div className="flex justify-end mb-4">
              <button 
                onClick={clearCart}
                className="text-red-500 hover:text-red-400 transition-colors text-sm"
              >
                Clear All Items
              </button>
            </div>
          )}
        </div>
        
        <div className="h-1/2 w-full p-4 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 lg:px-10 xl:px-40">
          <div className="flex justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-4">
            <span className="text-gray-300">Subtotal ({totalItems} items)</span>
            <span className="font-bold">Rs {subtotal}/-</span>
          </div>
          <div className="flex justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-4">
            <span className="text-gray-300">Service Cost</span>
            <span className="font-bold">Rs {serviceCost}/-</span>
          </div>
          <div className="flex justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-4">
            <span className="text-gray-300">Delivery</span>
            <span className="font-bold text-green-400">Free</span>
          </div>
          <hr className="my-4 border-gray-600" />
          <div className="flex justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-4">
            <span className="text-xl font-bold">Total</span>
            <span className="text-xl font-bold text-yellow-400">Rs {total}/-</span>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-8 py-4 rounded-lg font-bebas text-lg transition-colors self-end"
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
