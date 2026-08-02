"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/core/components/input.component";
import { Button } from "@/core/components/button.component";
import { signupAction } from "@/features/auth/auth.action";

export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await signupAction(form);
    setSubmitting(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push("/bookings");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} data-testid="signup-form" className="flex flex-col gap-4">
      <Input
        label="Full name"
        testId="signup-name-input"
        value={form.name}
        onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        required
      />
      <Input
        label="Email"
        type="email"
        testId="signup-email-input"
        value={form.email}
        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        required
      />
      <Input
        label="Password"
        type="password"
        testId="signup-password-input"
        minLength={6}
        value={form.password}
        onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        required
      />
      {error && (
        <p className="text-sm text-red-500" data-testid="signup-form-error">
          {error}
        </p>
      )}
      <Button testId="signup-submit-button" type="submit" loading={submitting} className="w-full">
        Create account
      </Button>
    </form>
  );
}
