import React from "react";
import Layout from "../Layout";
import Link from "next/link";
import AllProducts from "./allProducts";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ProductsPage =async () => {
    const user = await currentUser();
  
    if (
      !user ||
      user.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
    ) {
      return redirect("/");
    }
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Products</h2>
        <Link
          href="/Admin/products/newProduct"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors flex items-center gap-2"
        >
          <span>+</span>
          Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AllProducts />
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ProductsPage;
