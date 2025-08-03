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
  <div className="mt-14 bg-gradient-to-br from-gray-100 to-gray-200 flex min-h-screen justify-center p-4">
    <div className="w-full md:w-[90%] xl:w-[70%] grid grid-cols-1 order-2 lg:order-1 gap-6">
      <Card className="w-full flex flex-col justify-around shadow-xl border border-gray-300 bg-white rounded-2xl">
        <CardHeader className="border-b border-gray-200 p-6">
          <CardTitle className="text-2xl font-semibold">Billing Info</CardTitle>
          <CardDescription className="text-gray-600">
            Please enter your billing info
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2 w-full lg:w-[48%]">
              <label htmlFor="name" className="font-medium text-gray-700">Name</label>
              <Input
                type="text"
                placeholder="Your Name"
                className="bg-gray-50 px-4 h-[50px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-[48%]">
              <label htmlFor="num" className="font-medium text-gray-700">Phone Number</label>
              <Input
                type="number"
                placeholder="Your Phone Number"
                className="bg-gray-50 px-4 h-[50px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2 w-full lg:w-[48%]">
              <label htmlFor="add" className="font-medium text-gray-700">Address</label>
              <Input
                type="text"
                placeholder="Your Address"
                className="bg-gray-50 px-4 h-[50px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-[48%]">
              <label htmlFor="city" className="font-medium text-gray-700">Town/City</label>
              <Input
                type="text"
                placeholder="Your City"
                className="bg-gray-50 px-4 h-[50px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-4 text-white bg-red-500 hover:bg-red-400 py-3 px-6 rounded-lg font-semibold transition"
          >
            Place Order
          </button>
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6 text-gray-800">
        <div className="p-4 flex flex-col lg:w-2/3 gap-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white border border-gray-300 rounded-lg shadow-sm p-4"
            >
              <div className="flex flex-col gap-1">
                <h1 className="uppercase text-lg font-semibold">{item.name}</h1>
                <span className="text-yellow-500 font-bold">Rs {item.price}/-</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    disabled={item.quantity <= 1}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="min-w-[30px] text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, +1)}
                    disabled={item.quantity >= 10}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <div className="font-semibold">Rs {item.price * item.quantity}/-</div>
                  <div className="text-sm text-gray-500">{item.quantity} × Rs {item.price}</div>
                </div>

                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-600 hover:text-red-400 transition-colors p-2"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-3 lg:w-1/3 border border-gray-300">
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
          <div className="flex justify-between font-semibold text-lg">
            <span>TOTAL</span>
            <span>Rs{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
;
}
