"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const { cartItems, removeFromCart, changeQuantity, clearCart } = useCart();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const serviceCost = 2.0;
  const deliveryCost = subtotal > 50 ? 0 : 5.0;
  const total = subtotal + serviceCost + deliveryCost;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    if (!name || !phone || !address || !city) {
      toast.error("Please fill in all billing fields.");
      return;
    }

    const order = {
      user: { name, phone, address, city },
      items: cartItems.map((item) => ({
        _id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: typeof item.image === "string" ? item.image : item.image.src,
      })),
      total,
      createdAt: new Date().toISOString(),
    };

    try {
      const { data } = await axios.post("/api/order", order);
      if (!data.success) {
        toast.error("❌ Failed to place order.");
        return;
      } 
      toast.success("✅ Order placed successfully!");
      clearCart();
      router.push('/confirm');
    } catch (err) {
      toast.error("❌ Failed to place order.");
      console.error("Checkout error:", err);
    }
  }

  const handleQuantityChange = (id: string, delta: number) => {
    changeQuantity(id, delta);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-bold text-gray-600">Loading...</h1>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-bold text-red-500">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="mt-14 bg-gray-300 mt-33 flex min-h-screen justify-center">
      <div className="cards w-full md:w-[70%] grid grid-cols-1 order-2 lg:order-1">
        <Card className="w-full lg:w-[852px] h-auto lg:h-[336px] flex flex-col justify-around">
          <CardHeader>
            <CardTitle>Billing Info</CardTitle>
            <CardDescription className="w-full flex items-center justify-between">
              <h1>Please enter your billing info</h1>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="w-full flex flex-wrap gap-4">
              <div className="name flex flex-col gap-3 w-full lg:w-[46%]">
                <label className="font-bold" htmlFor="name">Name</label>
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="bg-[#f6f7f9] px-8 h-[56px] rounded-xl"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="num flex flex-col gap-3 w-full lg:w-[50%]">
                <label className="font-bold" htmlFor="num">Phone Number</label>
                <Input
                  type="number"
                  placeholder="Your Phone Number"
                  className="bg-[#f6f7f9] px-8 h-[56px] rounded-xl"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex flex-wrap gap-4">
              <div className="add flex flex-col gap-3 w-full lg:w-[46%]">
                <label className="font-bold" htmlFor="add">Address</label>
                <Input
                  type="text"
                  placeholder="Your Address"
                  className="bg-[#f6f7f9] px-8 h-[56px] rounded-xl"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="city flex flex-col gap-3 w-full lg:w-[50%]">
                <label className="font-bold" htmlFor="city">Town/City</label>
                <Input
                  type="text"
                  placeholder="Your City"
                  className="bg-[#f6f7f9] px-8 h-[56px] rounded-xl"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="text-white bg-red-500 hover:bg-red-400 py-2 px-3 rounded-md transition"
            >
              Place Order
            </button>
            
          </CardContent>
        </Card>

        <div className="mt-4 flex flex-col lg:flex-row text-red-500">
          <div className="p-4 flex flex-col lg:w-2/3">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between bg-white backdrop-blur-sm border border-red-900/30 rounded-lg p-4 mb-4"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h1 className="uppercase text-xl font-bold text-black">{item.name}</h1>
                    <div className="text-yellow-400 font-bold">Rs {item.price}/-</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, -1)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 text-black rounded disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="min-w-[30px] text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, +1)}
                      disabled={item.quantity >= 10}
                      className="px-3 py-1 text-black rounded disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-lg">Rs {item.price * item.quantity}/-</div>
                    <div className="text-sm text-gray-400">{item.quantity} × Rs {item.price}</div>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-400 transition-colors p-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white rounded-md justify-between mb-2 flex flex-col gap-3 lg:w-1/3">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} items)</span>
              <span>Rs{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Cost</span>
              <span>Rs{serviceCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Cost</span>
              <span className={deliveryCost === 0 ? "text-green-500" : ""}>
                {deliveryCost === 0 ? "FREE!" : `Rs${deliveryCost.toFixed(2)}`}
              </span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>TOTAL</span>
              <span>Rs{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
