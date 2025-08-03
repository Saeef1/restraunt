"use client";
import Image from "next/image";
import { MenuItem } from "@/../interface";
import Quantity from "./quantity";
import  useMenu  from "@/Data/menu";
import React from "react";

const MenuCard = ({ Category }: { Category: string }) => {
  const product = useMenu();

  const filtered = product.filter((item) => item.category.includes(Category)) || [];

  return (
    <>
      {filtered.map((item: MenuItem) => (
<div
  key={item._id}
  className="max-w-sm w-full mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-crimson/40 transition-all duration-300 group"
>
  {/* Image with Hover Zoom */}
  <div className="relative w-full aspect-[4/3] overflow-hidden">
    <Image
      src={item.image}
      alt={item.name}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-110"
    />
    
    {/* Price Badge - visible always */}
    <div className="absolute bottom-3 left-3 bg-black/70 text-gold text-sm px-3 py-1 rounded-full font-bebas shadow">
      Rs. {item.price}/-
    </div>

    {/* Special Tag */}
    {item.special && (
      <span className="absolute top-3 right-3 bg-crimson text-white text-xs font-bold px-2 py-1 rounded-full shadow">
        SPECIAL
      </span>
    )}
  </div>

  {/* Content */}
  <div className="p-4 text-white space-y-2">
    <h3 className="text-xl font-bebas tracking-wide">{item.name}</h3>
    <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
  </div>

  {/* Quantity Button */}
  <div className="px-4 pb-4">
    <div className="flex justify-end">
      <Quantity
        _id={item._id}
        name={item.name}
        description={item.description}
        price={item.price}
        image={item.image}
        special={item.special}
        category={item.category}
      />
    </div>
  </div>
</div>

        ))}
    </>
  );
};

export default MenuCard;
