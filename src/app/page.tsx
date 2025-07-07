import React from 'react'
import Hero1 from '@/components/hero1'
import Menu from '@/components/Section'


const Home = () => {
  return (
    <>
     <div>
      <Hero1/>
      <main id="menu" className="bg-black text-white min-h-screen">
      <Menu Title="DEALS"/>
      <Menu Title="BBQ"/>
      <Menu Title="Fast Food"/>
      <Menu Title="Chowmien"/>
      <Menu Title="Pizza"/>
      </main>
    </div> 
    </>
  )
}

export default Home
