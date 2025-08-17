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
  return <><div className="mt-14 min-h-[calc(100vh-6rem)] flex flex-col lg:flex-row items-start text-white">
  {/* Cart Items */}
  <div className="w-full lg:w-2/3 p-4 flex flex-col gap-4 overflow-y-auto">
    {cartItems.map((item) => (
      <div 
        key={item._id}
        className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-4"
      >
        {/* Left - image + name + price */}
        <div className="flex items-center gap-4">
          <Image 
            src={item.image} 
            alt={item.name} 
            width={80} 
            height={80}
            className="rounded-lg object-cover"
          />
          <div>
            <h1 className="uppercase text-base sm:text-lg md:text-xl font-bold text-white">
              {item.name}
            </h1>
            <div className="text-yellow-400 font-bold text-sm sm:text-base">
              Rs {item.price}/-
            </div>
          </div>
        </div>

        {/* Right - quantity + total + remove */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => changeQuantity(item._id, -1)}
              disabled={item.quantity <= 1}
              className="px-3 py-1 text-white rounded disabled:opacity-50"
            >
              -
            </button>
            <span className="min-w-[30px] text-center font-bold">{item.quantity}</span>
            <button 
              onClick={() => changeQuantity(item._id, +1)}
              disabled={item.quantity >= 10}
              className="px-3 py-1 text-white rounded disabled:opacity-50"
            >
              +
            </button>
          </div>
          
          <div className="text-right">
            <div className="font-bold text-sm sm:text-base md:text-lg">
              Rs {item.price * item.quantity}/-
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              {item.quantity} × Rs {item.price}
            </div>
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
          className="text-red-500 hover:text-red-400 transition-colors text-sm sm:text-base"
        >
          Clear All Items
        </button>
      </div>
    )}
  </div>

  {/* Order Summary */}
  <div className="w-full lg:w-1/3 p-4 flex flex-col gap-4">
    <div className="flex justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-4">
      <span className="text-gray-300 text-sm sm:text-base md:text-lg">
        Subtotal ({totalItems} items)
      </span>
      <span className="font-bold text-sm sm:text-base md:text-lg">
        Rs {subtotal}/-
      </span>
    </div>

    <div className="flex justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-4">
      <span className="text-gray-300 text-sm sm:text-base md:text-lg">
        Service Cost
      </span>
      <span className="font-bold text-sm sm:text-base md:text-lg">
        Rs {serviceCost}/-
      </span>
    </div>

    <div className="flex justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-4">
      <span className="text-gray-300 text-sm sm:text-base md:text-lg">
        Delivery
      </span>
      <span className="font-bold text-green-400 text-sm sm:text-base md:text-lg">
        Free
      </span>
    </div>

    <hr className="my-4 border-gray-600" />

    <div className="flex justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-4">
      <span className="text-lg sm:text-xl md:text-2xl font-bold">Total</span>
      <span className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400">
        Rs {total}/-
      </span>
    </div>

    <button
      onClick={handleCheckout}
      disabled={cartItems.length === 0}
      className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bebas text-base sm:text-lg md:text-xl transition-colors self-end"
    >
      CHECKOUT
    </button>
  </div>
</div>

  </>
};

export default Cart;
