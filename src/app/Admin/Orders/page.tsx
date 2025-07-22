import Layout from '../Layout';
import dynamic from 'next/dynamic';

const NewOrder = dynamic(() => import('@/app/Admin/Orders/newOrder'), {
  ssr: false,
});

export default function Page() {
  return (
    <Layout>
      <NewOrder />
    </Layout>
  );
}
