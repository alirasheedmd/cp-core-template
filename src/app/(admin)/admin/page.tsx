import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect("/admin/dashboard");

  // This is just a fallback, but since the user is redirected, this code should not run
  return null;
}
