  "use client"
import Image from "next/image";
import { MenuItem } from "@/../interface";
import Quantity from "./quantity";
import axios from "axios";
import React,{ useEffect, useState } from "react";

const MenuCard = ({ Category }: { Category: string }) => {
  const [product, setProduct] = useState<MenuItem[]>([]);
  
  useEffect(() => {
      axios.get("/api/product").then((response) => {
        setProduct(response.data);
      });
    }, []);

  return (
    <>
      {product
        .filter((item: MenuItem) => item.category.includes(Category))
        .map((item: MenuItem) => (
          <div
            key={item._id}
            className= "bg-gray-900/50 text-center backdrop-blur-sm border border-red-900/30 rounded-md p-6 hover:border-[crimson]/60 transition-all duration-300 group"
          >
            <div className="relative mb-4 smoke-effect">
              <Image
                src={item.image}
                alt={item.name}
                width={800}
                height={600}
                className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              {item.special && (
                <div className="absolute top-2 right-2 bg-[crimson] text-white px-2 py-1 rounded text-sm font-bebas">
                  SPECIAL
                </div>
              )}
            </div>
            <h3 className="font-bebas text-2xl text-white mb-2">{item.name}</h3>
            <p className="text-gray-400 mb-4">{item.description}</p>
            <div className="flex  justify-between items-center">
              <span className="text-[gold] font-bebas text-xl">
                RS. {item.price}/-
              </span>
              <i className={` text-white-600`}>
                <Quantity
                  _id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  special={item.special}
                  category={item.category}
                />
              </i>
            </div>
          </div>
        ))}
    </>
  );
};

export default MenuCard;
