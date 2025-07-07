"use client";
import { CartItem, useCart } from "@/context/CartContext";

type QuantityProps = Omit<CartItem, "quantity">; // everything except quantity

const Quantity = (item: QuantityProps) => {
  const { getItemQuantity, addToCart, changeQuantity } = useCart();
  const qty = getItemQuantity(item.id);

  // Debug logging

  const inc = () => {
    // console.log(`Incrementing ${item.id} from ${qty}`);
    if (qty === 0) {
      addToCart({ ...item, quantity: 1 });   // first time → add
    } else {
      changeQuantity(item.id, +1);           // already there → +1
    }
  };

  const dec = () => {
    // console.log(`Decrementing ${item.id} from ${qty}`);
    changeQuantity(item.id, -1);
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={dec} 
        disabled={qty === 0}
        className="px-2 py-1 text-white  disabled:opacity-50"
      >
        -
      </button>
      <span className="min-w-[20px] text-center">{qty}</span>
      <button 
        onClick={inc} 
        disabled={qty >= 10}
        className="px-2 py-1 text-white  disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
