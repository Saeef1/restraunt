"use client";
import { redirect } from "next/navigation";
import Layout from "@/app/Admin/Layout";
import { User, Mail, Calendar, Shield } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { EmailAddressResource } from "@clerk/types";

export default function AdminPage() {

  const { user, isLoaded } = useUser();

  if (!isLoaded) return null; // or loading spinner

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL;

  if (!user || user.primaryEmailAddress?.emailAddress !== adminEmail) {
    redirect("/");
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your restaurant.</p>
        </div>

        {/* Admin Profile Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <User className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.fullName}</h2>
              <p className="text-gray-600">Restaurant Administrator</p>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <Shield className="h-4 w-4 mr-1" />
                Admin
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">
                  {user.emailAddresses.map((emailObj: EmailAddressResource) => emailObj.emailAddress).join(", ")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Member Since</p>
                <p className="text-sm text-gray-600">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Role</p>
                <p className="text-sm text-gray-600">Super Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/Admin/products/newProduct"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Add Product</p>
                <p className="text-sm text-gray-600">Create new menu item</p>
              </div>
            </Link>

            <Link 
              href="/Admin/Orders"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">View Orders</p>
                <p className="text-sm text-gray-600">Manage customer orders</p>
              </div>
            </Link>

            <Link 
              href="/Admin/products"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Products</p>
                <p className="text-sm text-gray-600">Edit menu items</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-sm text-gray-600">You logged in successfully</p>
              <span className="text-xs text-gray-400 ml-auto">Just now</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <p className="text-sm text-gray-600">Admin dashboard accessed</p>
              <span className="text-xs text-gray-400 ml-auto">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
