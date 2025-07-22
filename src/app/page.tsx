import React from 'react'
import Hero1 from '@/components/hero1'
import Main from '@/components/main'

const Home = () => {
  return (
    <>
     <div>
      <Hero1/>
      <main id="menu" className="bg-black text-white min-h-screen">
        <Main />        
      </main>
    </div> 
    </>
  )
}

export default Home
