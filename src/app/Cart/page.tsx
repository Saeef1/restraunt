import React from "react";
import Image from "next/image";
import img4 from "@/public/menu/img4.jpg";

const Cart = () => {
  return (
    <>
      <div className="h-[calc(100vh-6rem)] lg:flex-row md:h-[calc(100vh-6rem)] flex flex-col items-center text-red-500">
        <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll md:h-full md:mt-7 lg:w-2/3 lg:px-20 xl:px-40 ">
          <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-2 mb-4">
            <Image src={img4} alt="sfaf" width={100} height={100} />
            <div className="">
              <h1 className="uppercase text-xl font-bold">title</h1>
              <span className="">araar</span>
            </div>
            <div className=" font-bold ">Rs 700</div>
            <span className="cursor-pointer">X</span>
          </div>
          <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm  border-red-900/30 rounded-lg p-2 mb-4">
            <Image src={img4} alt="sfaf" width={100} height={100} />
            <div className="">
              <h1 className="uppercase text-xl font-bold">title</h1>
              <span className="">araar</span>
            </div>
            <div className=" font-bold ">Rs 700</div>
            <span className="cursor-pointer">X</span>
          </div>
          <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-2 mb-4">
            <Image src={img4} alt="sfaf" width={100} height={100} />
            <div className="">
              <h1 className="uppercase text-xl font-bold">title</h1>
              <span className="">araar</span>
            </div>
            <div className=" font-bold ">Rs 700</div>
            <span className="cursor-pointer">X</span>
          </div>
          <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-2 mb-4">
            <Image src={img4} alt="sfaf" width={100} height={100} />
            <div className="">
              <h1 className="uppercase text-xl font-bold">title</h1>
              <span className="">araar</span>
            </div>
            <div className=" font-bold ">Rs 700</div>
            <span className="cursor-pointer">X</span>
          </div>
          <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-2 mb-4">
            <Image src={img4} alt="sfaf" width={100} height={100} />
            <div className="">
              <h1 className="uppercase text-xl font-bold">title</h1>
              <span className="">araar</span>
            </div>
            <div className=" font-bold ">Rs 700</div>
            <span className="cursor-pointer">X</span>
          </div>
        </div>
        <div className="h-1/2 p-4 flex flex-col gap-4 justify-center lg;h-full lg:w-1/3 lg:px-20 lx:px:40">
          <div className="flex justify-between  bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-2">
            <span>sub total (5 items ) </span>
            <span>12312</span>
          </div>
          <div className="flex justify-between  bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-2">
            <span>service cost </span>
            <span>0</span>
          </div>
          <div className="flex justify-between  bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-2">
            <span>Delivery </span>
            <span>Free</span>
          </div>
          <hr className="my-4 border" />
          <div className="flex justify-between bg-gray-800/50 backdrop-blur-sm border border-red-900/30 rounded-lg p-2">
            <span>Total </span>
            <span>12312</span>
          </div>
          <button className="border rounded-md self-end p-3">CHECKOUT</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
