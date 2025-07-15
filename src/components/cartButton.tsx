"use client";
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useCart } from '@/context/CartContext'

const CartButton = () => {
  const { cartItems } = useCart();
  
  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Link href="/Cart" className='fixed bottom-3 right-3 m-4 p-2 bg-[crimson] text-white rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300 '>
        <div className="flex items-center justify-center">
          <ShoppingCart size={24} />
        </div>
        
        {/* Cart Count Badge */}
        {totalItems > 0 && (
          <div className="absolute -top-2 -right-2 bg-[gold] text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {totalItems > 99 ? '99+' : totalItems}
          </div>
        )}
      </Link>
    </>
  )
}

export default CartButton
