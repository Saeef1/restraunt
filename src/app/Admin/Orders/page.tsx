import { redirect } from 'next/navigation';
import Layout from '../Layout';
import dynamic from 'next/dynamic';
import { currentUser } from '@clerk/nextjs/server';

const NewOrder = dynamic(() => import('@/app/Admin/Orders/newOrder'), {
  ssr: false,
});


export default async function Page() {
    const user = await currentUser();
  
    if (
      !user ||
      user.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL|| process.env.ADMIN_EMAIL
    ) {
      return redirect("/");
    }
  
  return (
    <Layout>
      <NewOrder />
    </Layout>
  );
}
