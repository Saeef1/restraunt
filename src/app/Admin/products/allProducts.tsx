"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { MenuItem } from "../../../../interface";

const AllProducts = () => {
  const [product, setProduct] = useState<MenuItem[]>([]);

  useEffect(() => {
    axios.get("/api/product").then((response) => {
      setProduct(response.data);
    });
  }, []);

  // DELETE function
  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`/api/product/?_id=${_id}`);
      setProduct((prev) => prev.filter((item) => item._id !== _id));
      // toast.success("Product deleted!"); // Optional: show a toast
    } catch (error) {
      // toast.error("Failed to delete product."); // Optional: show a toast
      console.error("Delete failed", error);
    }
  };

  return (
    <>
      {product.map((item) => (
        <tr className="border p-1 border-gray-300" key={item._id}>
          <td className="border p-1 border-gray-300">{item.name}</td>
          <td className="border p-1 border-gray-300">
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default AllProducts;
