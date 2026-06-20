import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminPage from "@/components/AdminPage";

export default function Admin() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token');

  if (!token || token.value !== 'authenticated') {
    redirect('/admin/login');
  }

  return <AdminPage />;
}
