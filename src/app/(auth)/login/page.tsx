import Link from "next/link";
import { LoginForm } from "@/features/auth/login-form.component";

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirect } = await searchParams;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Log in to manage your bookings.</p>
      </div>
      <LoginForm redirectTo={redirect || "/bookings"} />
      <p className="text-center text-sm text-muted-foreground">
        No account?{" "}
        <Link href="/signup" data-testid="login-signup-link" className="font-medium text-brand hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
