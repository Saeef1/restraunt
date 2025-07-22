import { connectDB } from "@/app/lib/mongoose";
import Order from "@/app/modules/order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();

    const order = await Order.create({
      ...body,
      orderId: `ORD-${Date.now()}`,
      createdAt: new Date(),
      status: "pending"
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order saving error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

// 📦 GET - Fetch all orders (optimized with caching)
export async function GET() {
  await connectDB();

  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .select('_id orderId user items total status createdAt')
      .lean();
    
    // Add caching headers for better performance
    const response = NextResponse.json({ success: true, orders });
    response.headers.set('Cache-Control', 'public, s-maxage=5, stale-while-revalidate=30');
    
    return response;
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
