"use server";

import { redirect } from "next/navigation";
import type { LoginInput, SignupInput } from "@/core/types/user.type";
import { clearSession, createSession, createUser, findUserByCredentials, findUserByEmail } from "@/features/auth/auth.service";

type ActionResult = { success: true } | { success: false; error: string };

export async function loginAction(input: LoginInput): Promise<ActionResult> {
  const user = await findUserByCredentials(input);
  if (!user) return { success: false, error: "Invalid email or password." };
  await createSession(user._id);
  return { success: true };
}

export async function signupAction(input: SignupInput): Promise<ActionResult> {
  if (!input.name.trim() || !input.email.trim() || input.password.length < 6) {
    return { success: false, error: "Please fill in every field (password must be at least 6 characters)." };
  }
  const existing = await findUserByEmail(input.email);
  if (existing) return { success: false, error: "An account with this email already exists." };
  const user = await createUser(input);
  await createSession(user._id);
  return { success: true };
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/");
}
