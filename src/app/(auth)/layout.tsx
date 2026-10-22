import { Navbar } from "@/core/components/navbar.component";
import { getCurrentUser } from "@/features/auth/auth.service";
import { logoutAction } from "@/features/auth/auth.action";
import { MagicCard } from "@/core/components/magic-card.component";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <>
      <Navbar user={user} onLogout={logoutAction} />
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-16">
        <MagicCard className="w-full max-w-sm [&_input]:bg-white dark:[&_input]:bg-surface">{children}</MagicCard>
      </div>
    </>
  );
}
