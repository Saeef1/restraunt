"use client";
import { redirect } from 'next/navigation';
import Layout from '../Layout';
import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';

const NewOrder = dynamic(() => import('@/app/Admin/Orders/newOrder'), {
  ssr: false,
});


export default function Page() {
    
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null; // or loading spinner

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL;

  if (!user || user.primaryEmailAddress?.emailAddress !== adminEmail) {
    redirect("/");
  }
  
  return (
    <Layout>
      <NewOrder />
    </Layout>
  );
}
