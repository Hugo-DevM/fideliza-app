import { SupabaseClient } from "@/lib/supabase/client";
import { SingupSchemaType } from "@/features/auth/schemas/singup.schema";

export async function SingupService(data: SingupSchemaType) {
  const supabase = SupabaseClient();

  return await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
}
