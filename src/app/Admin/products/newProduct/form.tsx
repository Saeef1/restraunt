"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

export const categories = ["Pizza DEALS", "Fast Food", "Chowmien", "DEALS", "BBQ"];


const Form = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [special, setSpecial] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function createProduct(ev: { preventDefault: () => void; }) {
    ev.preventDefault();
    if (!name || !description || !price || !category.length || !imageFile) {
      alert("Please fill all fields and select an image");
      return;
    }

    setIsUploading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('special', special.toString());
      formData.append('category', JSON.stringify(category));
      formData.append('image', imageFile);

      await axios.post("/api/product", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset form after successful submission
      setName("");
      setDescription("");
      setPrice(0);
      setSpecial(false);
      setCategory([]);
      setImageFile(null);
      setImagePreview("");
      
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  
  return (
    <>
    <form onSubmit={createProduct} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product name</label>
        <input 
          type="text" 
          value={name} 
          placeholder="Product name" 
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea 
          placeholder="Product description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
        <input 
          type="number" 
          placeholder="Price" 
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="flex items-center">
        <input 
          type="checkbox" 
          checked={special}
          onChange={e => setSpecial(e.target.checked)}
          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Special Product</label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select 
          multiple
          value={category}
          onChange={(e) => {
            const options = Array.from(e.target.selectedOptions, option => option.value);
            setCategory(options);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple categories</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <p className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG, GIF, WebP</p>
      </div>

      {imagePreview && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image Preview</label>
          <div className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden">
            <Image
              src={imagePreview}
              alt="Product Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={!name || !description || !price || !category.length || !imageFile || isUploading}
      >
        {isUploading ? "Creating Product..." : "Add Product"}
      </button>
    </form>
    </>
  );
};

export default Form;
