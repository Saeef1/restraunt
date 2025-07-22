import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  user: {
    name: String,
    phone: String,
    address: String,
    city: String,
  },
  items: [
    {
      _id: String,
      name: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  total: Number,
  status: { type: String, default: "pending" },
  orderId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
