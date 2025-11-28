"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { LoginSchema } from "../schemas/login.schema";

export async function loginAction(formData: FormData) {
  const data = LoginSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const supabase = await supabaseServer();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) return { error: error.message };
  return { success: true };
}
