"use client";

import { Flame } from "lucide-react";
import React from "react";

export default function HeroSection() {
  const handleOrderClick = () => {
    const whatsappUrl =
      "https://wa.me/923312298702?text=Hello! I would like to place an order for Beef Dhaga Kabab.";
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="relative min-h-screen flex  items-center justify-center overflow-hidden">
      {/* Hero background using the provided image */}
      <div className="absolute inset-0 hero-bg">
        {/* <Image 
          src={bannerImage} 
          alt="Beef Dhaga Kabab specialty" 
          fill
          className="object-cover"
          priority
        /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-red-900/40 to-black/60"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="smoke-effect relative inline-block mb-8">
          <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl text-white mb-4 animate-glow">
            <span className="[crimson]"></span>{" "}
            <span className="text-[gold]">Burato</span>
          </h1>
          <h2 className="font-bebas text-4xl md:text-6xl text-white mb-6">
            ALL IN ONE BITE OF HEAVEN!
          </h2>
          <h3 className="font-bebas p-2 text-5xl md:text-6xl text-[crimson] animate-glow">
            SIZZLING BURGERS ,CHEESY PIZZAS & CRISPY FRIES
          </h3>
        </div>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Get ready to satisfy your wildest cravings — juicy grilled patties,
          oozing cheese, golden fries, and oven-baked pizzas, made fresh, fast,
          and full of flavor.
        </p>

        <button
          onClick={handleOrderClick}
          className="group flex mx-auto relative bg-gradient-to-r from-red-900 to-[crimson] px-8 py-4 text-xl font-bebas text-white rounded-lg hover:from-[crimson] hover:to-orange-500 transition-all duration-500 transform hover:scale-105 animate-glow"
        >
          <i className="fas fa-fire mr-2 group-hover:animate-bounce">
            <Flame />
          </i>
          ORDER NOW
          <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-[gold] opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-500"></span>
        </button>

        <div className="mt-8 flex items-center justify-center space-x-6">
          <div className="text-center">
            <div className="text-3xl font-bebas text-[gold]">15+</div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
          <div className="w-px h-12 bg-[crimson]"></div>
          <div className="text-center">
            <div className="text-3xl font-bebas text-[gold]">50K+</div>
            <div className="text-sm text-gray-400">Happy Customers</div>
          </div>
          <div className="w-px h-12 bg-[crimson]"></div>
          <div className="text-center">
            <div className="text-3xl font-bebas text-[gold]">24/7</div>
            <div className="text-sm text-gray-400">Service</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="fas fa-chevron-down text-white text-2xl"></i>
      </div>
    </section>
  );
}
