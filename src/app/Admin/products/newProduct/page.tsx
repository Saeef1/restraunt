import React from "react";
import Layout from "@/app/Admin/Layout";
import Form from "./form";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const user = await currentUser();
  const adminEmail = process.env.ADMIN_EMAIL; // keep it server-only

  if (!user || user.primaryEmailAddress?.emailAddress !== adminEmail) {
    redirect("/");
  }

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <Form />
      </div>
    </Layout>
  );
};

export default page;
