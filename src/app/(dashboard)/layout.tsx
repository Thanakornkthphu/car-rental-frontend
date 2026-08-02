import { redirect } from "next/navigation";
import { Navbar } from "@/core/components/navbar.component";
import { Footer } from "@/core/components/footer.component";
import { getCurrentUser } from "@/features/auth/auth.service";
import { logoutAction } from "@/features/auth/auth.action";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <>
      <Navbar user={user} onLogout={logoutAction} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
