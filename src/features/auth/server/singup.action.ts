"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { SingupSchema } from "../schemas/singup.schema";

export async function singupAction(formData: FormData) {
  const data = SingupSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    companyName: formData.get("companyName"),
    giroId: formData.get("giroId"),
  });

  const supabase = await supabaseServer();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) return { error: error.message };

  return { success: true };
}
