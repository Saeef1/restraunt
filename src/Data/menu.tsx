"use client";
import { useState , useEffect, useRef } from "react";
import axios from "axios";
import { MenuItem } from "../../interface";
import { OrderType } from "../../interface";

export default function useMenu() {
  const [product, setProduct] = useState<MenuItem[]>([]);

  useEffect(() => {
    axios.get("/api/product").then((response) => {
      setProduct(response.data);
    });
  }, []);

  return product;
}

export function useOrder() {
 const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastFetchTime = useRef<number>(0);
  const CACHE_DURATION = 10000; // 10 seconds for orders (more frequent updates)
 
  const fetchOrders = async (forceRefresh = false) => {
    const now = Date.now();
    
    // Use cached data if available and not expired
    if (!forceRefresh && orders.length > 0 && (now - lastFetchTime.current) < CACHE_DURATION) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get("/api/order");
      setOrders(Array.isArray(data.orders) ? data.orders : []);
      lastFetchTime.current = now;
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to fetch orders. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error, refetch: () => fetchOrders(true) };
  }

