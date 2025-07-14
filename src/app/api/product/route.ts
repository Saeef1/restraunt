import { connectDB } from "@/app/lib/mongoose";
import Item from "@/app/modules/item";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { image, name, description, price, special, category } =
      await req.json();

    const itemDoc = await Item.create({
      name,
      description,
      price,
      special,
      category,
      image,
    });

    return NextResponse.json(itemDoc, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating item:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}

// ✅ GET handler (for fetching items)
export async function GET() {
  await connectDB();

  try {
    const items = await Item.find();
    return NextResponse.json(items);
  } catch (error) {
    console.error("❌ Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");

  if (id) {
    try {
      await Item.findByIdAndDelete(id);
      return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("❌ Error deleting item:", error);
      return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Missing _id parameter" }, { status: 400 });
  }
}
