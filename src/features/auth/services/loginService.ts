import { SupabaseClient } from "@/lib/supabase/client";
import { LoginSchemaType } from "@/features/auth/schemas/login.schema";

export async function LoginService(data: LoginSchemaType) {
  const supabase = SupabaseClient();

  return await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
}
