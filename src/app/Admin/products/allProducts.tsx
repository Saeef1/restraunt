"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { MenuItem } from "../../../../interface";
import toast from "react-hot-toast";

const AllProducts = () => {
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const lastFetchTime = useRef<number>(0);
  const CACHE_DURATION = 30000; // 30 seconds


  // Fetch products with caching and proper error handling
  const fetchProducts = async (forceRefresh = false) => {
    const now = Date.now();
    
    // Use cached data if available and not expired
    if (!forceRefresh && products.length > 0 && (now - lastFetchTime.current) < CACHE_DURATION) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/product");
      setProducts(response.data);
      lastFetchTime.current = now;
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);
  // Optimized delete function with optimistic updates
  const handleDelete = async (_id: string) => {
    try {
      setDeletingId(_id);
      
      // Optimistic update - remove from UI immediately
      setProducts((prev) => prev.filter((item) => item._id !== _id));
      
      await axios.delete(`/api/product/?_id=${_id}`);
      
      // Success - item is already removed from UI
    } catch (error) {
      console.error("Delete failed", error);
      
      // Revert optimistic update on error
      await fetchProducts(true); // Force refresh
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <tr>
        <td colSpan={2} className="text-center py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Loading products...</span>
          </div>
        </td>
      </tr>
    );
  }

  if (error) {
    return (
      <tr>
        <td colSpan={2} className="text-center py-8 text-red-600">
          <div>
            <p>{error}</p>
            <button 
              onClick={() => fetchProducts(true)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </td>
      </tr>
    );
  }

  if (products.length === 0) {
    return (
      <tr>
        <td colSpan={2} className="text-center py-8 text-gray-500">
          No products found. Add your first product!
        </td>
      </tr>
    );
  }

  return (
    <>
      {products.map((item) => (
        <tr className="border p-1 border-gray-300 hover:bg-gray-50 transition-colors" key={item._id}>
          <td className="border p-1 border-gray-300">{item.name}</td>
          <td className="border p-1 border-gray-300">
            <button 
              onClick={() => handleDelete(item._id)}
              disabled={deletingId === item._id}
              className={`px-3 py-1 rounded text-white transition-colors ${
                deletingId === item._id 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {deletingId === item._id ? 'Deleting...' : 'Delete'}
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default AllProducts;
