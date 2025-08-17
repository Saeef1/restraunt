"use client";
import React, { useState } from "react";
import { useOrder } from "@/Data/menu";
import axios from "axios";
import toast from "react-hot-toast";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface UserInfo {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
}

interface Order {
  _id: string;
  orderId: string;
  createdAt: string;
  user?: UserInfo;
  items: OrderItem[];
  total: number;
  status?: string;
}

const NewOrder = () => {
  const { orders, loading, error, refetch } = useOrder();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // View order details
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Update order status
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingStatus(orderId);
      await axios.patch(`/api/order/${orderId}`, { status: newStatus });
      await refetch(); // Refresh the orders list
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status. Please try again.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Delete order
  const handleDeleteOrder = async (orderId: string) => {
    if (!toast.arguments("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      setUpdatingStatus(orderId);
      await axios.delete(`/api/order/${orderId}`);
      await refetch(); // Refresh the orders list
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.success("Failed to delete order. Please try again.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <p>{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          <p className="text-lg mb-2">No orders found</p>
          <p className="text-sm">Orders will appear here once customers place them.</p>
        </div>
      </div>
    );
  }

  // Filter orders by status
  const filteredOrders = selectedStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-orange-100 text-orange-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string | undefined) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Orders Management</h2>
          <p className="text-gray-600">Manage customer orders and track their status</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Orders ({orders.length})</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div className="font-medium">{order.user?.name || 'N/A'}</div>
                    <div className="text-gray-500">{order.user?.phone || 'N/A'}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="text-gray-400">x{item.quantity}</span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="text-xs text-gray-400 mt-1">
                        +{order.items.length - 2} more items
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  Rs {order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status ?? 'pending')}`}>
                    {getStatusText(order.status ?? 'pending')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleViewOrder(order)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <select
                    value={order.status || 'pending'}
                    onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                    disabled={updatingStatus === order._id}
                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button 
                    onClick={() => handleDeleteOrder(order._id)}
                    disabled={updatingStatus === order._id}
                    className="text-red-600 hover:text-red-900 ml-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
            <div className="text-sm text-gray-600">Delivered</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              Rs {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details - {selectedOrder.orderId}</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Customer Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                <div className="bg-gray-50 p-3 rounded">
                  <p><strong>Name:</strong> {selectedOrder.user?.name || 'N/A'}</p>
                  <p><strong>Phone:</strong> {selectedOrder.user?.phone || 'N/A'}</p>
                  <p><strong>Address:</strong> {selectedOrder.user?.address || 'N/A'}</p>
                  <p><strong>City:</strong> {selectedOrder.user?.city || 'N/A'}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                <div className="bg-gray-50 p-3 rounded">
                  { selectedOrder.items.map((item: OrderItem, index: number) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span>{item.name}</span>
                      <span className="text-gray-600">
                        {item.quantity} × Rs {item.price} = Rs {(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <hr className="my-2" />
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total:</span>
                    <span>Rs {selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Order Status</h4>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Ordered on {new Date(selectedOrder.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrder;
