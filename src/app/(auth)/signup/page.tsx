import Link from "next/link";
import { SignupForm } from "@/features/auth/signup-form.component";

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Create your account</h1>
        <p className="text-sm text-muted-foreground">Sign up to start booking cars.</p>
      </div>
      <SignupForm />
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" data-testid="signup-login-link" className="font-medium text-brand hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
