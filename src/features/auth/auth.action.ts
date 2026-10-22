"use server";

import { redirect } from "next/navigation";
import type { LoginInput, SignupInput } from "@/core/types/user.type";
import { clearSession, createSession, login, signup } from "@/features/auth/auth.service";
import { getPasswordError } from "@/features/auth/password.util";

type ActionResult = { success: true } | { success: false; error: string };

export async function loginAction(input: LoginInput): Promise<ActionResult> {
  try {
    const { accessToken } = await login(input);
    await createSession(accessToken);
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unable to sign in." };
  }
}

export async function signupAction(input: SignupInput): Promise<ActionResult> {
  if (!input.name.trim() || !input.email.trim()) {
    return { success: false, error: "Please enter your name and email." };
  }
  const passwordError = getPasswordError(input.password);
  if (passwordError) return { success: false, error: passwordError };

  try {
    await signup(input);
    const { accessToken } = await login(input);
    await createSession(accessToken);
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unable to create an account." };
  }
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/");
}
