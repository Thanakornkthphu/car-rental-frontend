"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/core/components/input.component";
import { Button } from "@/core/components/button.component";
import { loginAction } from "@/features/auth/auth.action";
import { DEMO_ACCOUNT } from "@/features/auth/auth.constant";

interface LoginFormProps {
  redirectTo: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await loginAction(form);
    setSubmitting(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" data-testid="login-form" className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        testId="login-email-input"
        autoComplete="off"
        value={form.email}
        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        required
      />
      <Input
        label="Password"
        type="password"
        testId="login-password-input"
        autoComplete="off"
        value={form.password}
        onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        required
      />
      {error && (
        <p className="text-sm text-red-500" data-testid="login-form-error">
          {error}
        </p>
      )}
      <Button testId="login-submit-button" type="submit" loading={submitting} className="w-full">
        Log in
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        {`Demo account: ${DEMO_ACCOUNT}`}
      </p>
    </form>
  );
}
