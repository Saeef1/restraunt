import React from 'react'
import Hero1 from '@/components/hero1'
import Menu from '@/components/Section'


const Home = () => {
  return (
    <>
     <div>
      <Hero1/>
      <main id="menu" className="bg-black text-white min-h-screen">
      <Menu Title="Pizza DEALS"/>  
      <Menu Title="Promotional Deal"/>
      <Menu Title="BBQ"/>
      <Menu Title="Fast Food"/>      
      </main>
    </div> 
    </>
  )
}

export default Home
