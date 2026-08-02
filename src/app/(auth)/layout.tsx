import { Navbar } from "@/core/components/navbar.component";
import { getCurrentUser } from "@/features/auth/auth.service";
import { logoutAction } from "@/features/auth/auth.action";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <>
      <Navbar user={user} onLogout={logoutAction} />
      <div className="flex flex-1 flex-col items-center justify-center gap-8 py-16">
        <div className="w-full max-w-sm rounded-card border border-border bg-surface p-6">{children}</div>
      </div>
    </>
  );
}
