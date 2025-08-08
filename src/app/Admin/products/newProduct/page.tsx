"use client";
import React from "react";
import Layout from "@/app/Admin/Layout";
import Form from "./form";
import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";
const page = () => {
  
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null; // or loading spinner

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL;

  if (!user || user.primaryEmailAddress?.emailAddress !== adminEmail) {
    redirect("/");
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
