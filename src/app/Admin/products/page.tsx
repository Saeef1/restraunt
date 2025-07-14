"use client"
import React from "react";
import Layout from "../Layout";
import Link from "next/link";
import AllProducts from "./allProducts";

const page = () => {
 

  return (
    <Layout>
      <Link
        href="/Admin/products/newProduct"
        className="text-black bg-gray-400 py-1 px-2 rounded-md"
      >
        Add New Products
      </Link>

      <table className="w-full mt-5 ">
        <thead>
          <tr className="border bg-gray-300 p-2 border-gray-300">
            <td>
              Product Name
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <AllProducts />
        </tbody>
      </table>
    </Layout>
  );
};

export default page;
