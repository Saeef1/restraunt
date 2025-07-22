import { connectDB } from "@/app/lib/mongoose";
import Item from "@/app/modules/item";
import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// 📦 POST - Create a new item with image upload
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

    // Validate required fields
    if (!name || !description || isNaN(price) || !category || !imageFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate image file type
    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Validate category format
    if (!Array.isArray(category)) {
      return NextResponse.json(
        { error: "Invalid category format" },
        { status: 400 }
      );
    }

    // Convert image to buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize and generate unique filename
    const timestamp = Date.now();
    const originalName = imageFile.name;
    const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${safeName}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Save to database
    const imagePath = `/uploads/${filename}`;
    const itemDoc = await Item.create({
      name,
      description,
      price,
      special,
      category,
      image: imagePath,
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

// 📦 GET - Fetch all items (with cache headers)
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

// 📦 DELETE - Remove item by ID
export async function DELETE(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");

  if (!id) {
    return NextResponse.json({ error: "Missing _id parameter" }, { status: 400 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
  }

  try {
    await Item.findByIdAndDelete(id);
    return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting item:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
