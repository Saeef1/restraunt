import { connectDB } from "@/app/lib/mongoose";
import Item from "@/app/modules/item";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// 📦 POST - Create new product
export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const special = formData.get("special") === "true";
    const category = JSON.parse(formData.get("category") as string);
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    // 🧪 Debug logs (remove later)
    console.log("🔍 Form Data:", {
      name,
      description,
      price,
      special,
      category,
    });
    console.log(
      "📸 imageFile:",
      imageFile.name,
      imageFile.type,
      imageFile.size
    );

    // Convert image to base64
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUri = `data:${imageFile.type};base64,${base64}`;
    
    const uploadRes = await cloudinary.uploader.upload(dataUri, {
      folder: "restaurant-products",
    });
    const imageUrl = uploadRes.secure_url;

    // ✅ Save to MongoDB
    const itemDoc = await Item.create({
      name,
      description,
      price,
      special,
      category,
      image: imageUrl,
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

// 📦 GET - Get all products
export async function GET() {
  await connectDB();

  try {
    const items = await Item.find()
      .select("_id name description price special category image")
      .lean();

    const response = NextResponse.json(items);
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );

    return response;
  } catch (error) {
    console.error("❌ Error fetching items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

// 📦 DELETE - Delete by ID
export async function DELETE(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");

  if (!id) {
    return NextResponse.json({ error: "Missing _id" }, { status: 400 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
  }

  try {
    await Item.findByIdAndDelete(id);
    return NextResponse.json({ message: "Item deleted" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting item:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
