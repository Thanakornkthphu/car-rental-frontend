"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/core/components/input.component";
import { Button } from "@/core/components/button.component";
import { signupAction } from "@/features/auth/auth.action";
import { getPasswordError, MIN_PASSWORD_LENGTH } from "@/features/auth/password.util";
import { PasswordStrengthBar } from "@/features/auth/password-strength-bar.component";

export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const passwordError = getPasswordError(form.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
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
    <form onSubmit={handleSubmit} autoComplete="off" data-testid="signup-form" className="flex flex-col gap-4">
      <Input
        label="Full name"
        testId="signup-name-input"
        autoComplete="off"
        value={form.name}
        onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        required
      />
      <Input
        label="Email"
        type="email"
        testId="signup-email-input"
        autoComplete="off"
        value={form.email}
        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        required
      />
      <div className="flex flex-col gap-3">
        <Input
          label="Password"
          type="password"
          testId="signup-password-input"
          autoComplete="off"
          aria-describedby="signup-password-requirements"
          minLength={MIN_PASSWORD_LENGTH}
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          required
        />
        <PasswordStrengthBar password={form.password} />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-500" data-testid="signup-form-error">
          {error}
        </p>
      )}
      <Button testId="signup-submit-button" type="submit" loading={submitting} className="w-full">
        Create account
      </Button>
    </form>
  );
}
