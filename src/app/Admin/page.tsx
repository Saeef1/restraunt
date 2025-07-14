import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Layout from "@/app/Admin/Layout";

export default async function AdminPage() {
  const user = await currentUser();

  if (
    !user ||
    user.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
  ) {
    return redirect("/");
  }

  return <Layout>
        <div className="textack">{user.fullName}</div>
      </Layout>
    ;
}
