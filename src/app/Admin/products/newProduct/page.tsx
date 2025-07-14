import React from "react";
import Layout from "@/app/Admin/Layout";
import Form from "./form";
const page = () => {
  
  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold" >Add New Product</h1>
        <Form/>
      </div>
    </Layout>
  );
};

export default page;
