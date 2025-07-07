import { CartProvider } from '@/context/CartContext'
import React, { ReactNode } from 'react'

const GlobalProvider = ({children}:{children : ReactNode}) => {
  return <CartProvider>
    {children}
  </CartProvider>
}

export default GlobalProvider
