"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

const Form = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [special, setSpecial] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");

  async function createProduct(ev: { preventDefault: () => void; }) {
    ev.preventDefault();
    if (!name || !description || !price || !category.length || !image) {
      alert("Please fill all fields");
      return;
    }
    const data = {
      name,
      description,
        price,
        special,
        category,
        image,
    };
     await axios.post("/api/product", data)
  }
  const categories = ["Pizza DEALS", "Fast Food", "Chowmien", "DEALS", "BBQ"];

  return (
    <>
    <form onSubmit={createProduct}>
      <label>Product name</label>
      <input 
      type="text" 
      value={name} 
      placeholder="Product name" 
      onChange={(e) => setName(e.target.value)}
      />
      <label>Description</label>
      <textarea 
      placeholder="Des" 
      value={description} 
      onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price</label>
      <input 
      type="number" 
      placeholder="Price" 
      value={price}
      onChange={(e) => setPrice(Number(e.target.value))}
      />
      <label>Special</label>
      <input 
      type="checkbox" 
      checked={special}
      onChange={e => setSpecial(e.target.checked)}
      />
      <label>Category</label>
      <select multiple
       value={category}
       onChange={(e) => {
          const options = Array.from(e.target.selectedOptions, option => option.value);
          setCategory(options);
        }}
       >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <label>Image URL</label>
      <input 
      type="text" 
      placeholder="Image URL" 
      value={image} 
        onChange={(e) => setImage(e.target.value)}
      />
      <label>Image Preview</label>
      {image && (
        <Image
          src={image}
          alt="Product Preview"
          className="w-32 h-32 object-cover mb-2"
          width={128}
          height={128}
        />
      )}
      <button
      type="submit"
        className="bg-gray-400 px-2 py-1 rounded-md"
        disabled={!name || !description || !price || !category.length || !image}
        onClick={() => {
          // Handle form submission logic here
          console.log({
            name,
            description,
            price,
            special,
            category,
            image,
          });
        }}
      >
        Add Product
      </button>
      </form>
    </>
  );
};

export default Form;
