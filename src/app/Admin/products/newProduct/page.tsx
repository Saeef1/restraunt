import React from "react";
import Layout from "@/app/Admin/Layout";
import Form from "./form";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
const page =async () => {
    const user = await currentUser();
  
    if (
      !user ||
      user.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
    ) {
      return redirect("/");
    }
  
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
