"use client";
import React from 'react'
import Menu from '@/components/Section'
import { categories } from '@/app/Admin/products/newProduct/form'
const Main = () => {
  return (
    <>
      {
        categories.map((category: string) => (
          <Menu key={category} Title={category} />
        ))
      }
      
    </>
  )
}

export default Main
