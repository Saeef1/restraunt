"use client";
import React, { useEffect, useState } from "react";
import { useCart, CartItem } from "@/context/CartContext";
import Image from "next/image";
import { useOrder } from "@/Data/menu";
import { useRouter } from "next/navigation";

interface OrderItem {
  _id?: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

// Union type for items that can be either OrderItem or CartItem
type DisplayItem = OrderItem | CartItem;

interface UserInfo {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
}

interface Order {
  _id: string;
  orderId: string;
  createdAt: string;
  user?: UserInfo;
  items: OrderItem[];
  total: number;
  status?: string;
}

const ConfirmOrderPage = () => {
  const { cartItems } = useCart();
  const { orders } = useOrder();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Get the most recent active order (not delivered or cancelled)
  useEffect(() => {
    if (orders.length > 0) {
      // Filter out delivered and cancelled orders
      const activeOrders = orders.filter(order => 
        order.status !== 'delivered' && order.status !== 'cancelled'
      );
      
      if (activeOrders.length > 0) {
        const mostRecentActiveOrder = activeOrders.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];
        setLastOrder(mostRecentActiveOrder);
      } else {
        // All orders are delivered or cancelled, redirect to home page
        router.push('/');
        return;
      }
    }
  }, [orders, router]);

  // Calculate totals from the last order or cart items
  const orderItems: DisplayItem[] = lastOrder?.items || cartItems;
  const subtotal = orderItems.reduce(
    (sum: number, item: DisplayItem) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const serviceCost = 2.0;
  const deliveryCost = subtotal > 50 ? 0 : 5.0;
  const total = lastOrder?.total || (subtotal + serviceCost + deliveryCost);

  const totalItems = orderItems.reduce(
    (sum: number, item: DisplayItem) => sum + (item.quantity || 0),
    0
  );

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
          <p className="mt-4 text-lg text-white">Preparing your order...</p>
        </div>
      </div>
    );
  }

  const handleContinueShopping = () => {
    router.push('/');
  };

  // If no orders and no cart items, redirect to home
  if (!lastOrder && orderItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold text-red-500 mb-4">No Order Found</h1>
          <p className="text-gray-400 mb-8">We couldnapos;t find any recent orders.</p>
          <button
            onClick={handleContinueShopping}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="max-w-2xl mx-auto p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <svg 
            className="w-16 h-16 text-green-500 mx-auto mb-4" 
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
          </svg>
          <h1 className="text-3xl font-bebas font-bold text-white mt-4">
            {lastOrder?.status === 'pending' && 'Order Received!'}
            {lastOrder?.status === 'confirmed' && 'Order Confirmed!'}
            {lastOrder?.status === 'preparing' && 'Order Being Prepared!'}
            {lastOrder?.status === 'ready' && 'Order Ready for Pickup!'}
            {!lastOrder?.status && 'Order Confirmed!'}
          </h1>
          <p className="text-gray-300 mt-2">
            Thank you for your purchase. Your order {lastOrder?.orderId && `(#${lastOrder.orderId})`} 
            {lastOrder?.status === 'pending' && ' has been received and is being processed.'}
            {lastOrder?.status === 'confirmed' && ' has been confirmed and will be prepared shortly.'}
            {lastOrder?.status === 'preparing' && ' is being prepared by our kitchen.'}
            {lastOrder?.status === 'ready' && ' is ready for pickup or delivery!'}
            {!lastOrder?.status && ' has been placed successfully.'}
          </p>
        </div>

        <div className="border-t border-b border-white/20 py-6">
          <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>

          {/* Order Items List */}
          <div className="mb-6">
            {orderItems.map((item: DisplayItem, index: number) => (
              <div key={item._id || index} className="flex items-center mb-4 p-3 border-b border-white/10">
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image || '/placeholder.jpg'}
                    alt={item.name || "Product image"}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="font-bold text-white">{item.name}</h3>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-400">Qty: {item.quantity}</span>
                    <span className="font-semibold text-gold">
                      Rs. {(item.price * item.quantity)}/-
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Details */}
          <div className="space-y-3 text-white">
            <div className="flex justify-between">
              <span>Items ({totalItems}):</span>
              <span>Rs. {subtotal}/-</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee:</span>
              <span>Rs. {serviceCost}/-</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span>Rs. {deliveryCost}/-</span>
            </div>
          </div>

          <div className="flex justify-between mt-4 pt-4 border-t border-white/20 font-bold text-lg">
            <span className="text-white">Total:</span>
            <span className="text-gold">Rs. {total}/-</span>
          </div>
        </div>

        {/* Order Status Information */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Order Progress</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Order received</span>
            </li>
            <li className="flex items-start">
              <span className={`mr-2 ${(lastOrder?.status === 'confirmed' || lastOrder?.status === 'preparing' || lastOrder?.status === 'ready') ? 'text-green-500' : 'text-gray-500'}`}>
                {(lastOrder?.status === 'confirmed' || lastOrder?.status === 'preparing' || lastOrder?.status === 'ready') ? '✓' : '○'}
              </span>
              <span className={(lastOrder?.status === 'confirmed' || lastOrder?.status === 'preparing' || lastOrder?.status === 'ready') ? 'text-white' : 'text-gray-500'}>
                Order confirmed
              </span>
            </li>
            <li className="flex items-start">
              <span className={`mr-2 ${(lastOrder?.status === 'preparing' || lastOrder?.status === 'ready') ? 'text-green-500' : 'text-gray-500'}`}>
                {(lastOrder?.status === 'preparing' || lastOrder?.status === 'ready') ? '✓' : '○'}
              </span>
              <span className={(lastOrder?.status === 'preparing' || lastOrder?.status === 'ready') ? 'text-white' : 'text-gray-500'}>
                Kitchen is preparing your order
              </span>
            </li>
            <li className="flex items-start">
              <span className={`mr-2 ${lastOrder?.status === 'ready' ? 'text-green-500' : 'text-gray-500'}`}>
                {lastOrder?.status === 'ready' ? '✓' : '○'}
              </span>
              <span className={lastOrder?.status === 'ready' ? 'text-white' : 'text-gray-500'}>
                {lastOrder?.status === 'ready' ? 'Order ready!' : 'Estimated time: 30-45 minutes'}
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 text-center">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex-1"
            onClick={handleContinueShopping}
          >
            Order More Food
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex-1"
            onClick={handleContinueShopping}
          >
            Back to Menu
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Need help? <a href="/contact" className="text-red-400 hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrderPage;