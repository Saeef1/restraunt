"use client"
import React from 'react'
import Link from 'next/link'
import { ListOrdered, ShoppingBag, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
const Nav = () => {
    const inactiveLink = 'flex gap-2 item-center hover:text-gray-300'
    const activeLink = inactiveLink + ' bg-white px-3 py-1 font-bold text-gray-800 rounded-md shadow-md'
const route = usePathname()
    const isActive = (path: string , somwhere?:string) => {
        return route === path || somwhere ? activeLink : inactiveLink
    }
  return <>
    <aside className="relative bg-gray-400 p-4 left-1 h-screen gap-5 flex flex-col items-center  overflow-hidden">

        <div className="text-white text-lg font-bold">Admin Dashboard</div>
        <div className='mt-7 flex justify flex-col gap-5 '>
            <Link 
            href="/Admin" 
            className={isActive('/Admin')}>
                <User />
                Users
            </Link>
          <Link 
          href="/Admin/Orders" 
          className={isActive('/Admin/Orders')}>
            <ListOrdered />Orders</Link>
          <Link 
          href="/Admin/products" 
          className={isActive('/Admin/products') === activeLink || isActive('/Admin/products/newProduct') === activeLink ? activeLink : inactiveLink}>
                <ShoppingBag />
            Products
            </Link>
  
        </div>
          </aside>
  </>
}

export default Nav
