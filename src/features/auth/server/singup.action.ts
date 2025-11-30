"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { SingupSchema } from "../schemas/signup.schema";

export async function singupAction(formData: FormData) {
  const data = SingupSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    companyName: formData.get("companyName"),
    username: formData.get("username"),
    giroId: formData.get("giroId"),
  });

  const supabase = await supabaseServer();

  //SignUp
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError) return { error: authError.message };

  const userId = authData?.user?.id;
  if (!userId) return { error: "No se pudo crear el usuario" };

  // Función RPC para crear companies y users en una transacción
  const { data: companyId, error: companiesError } = await supabase.rpc(
    "create_company_on_signup",
    {
      p_company_name: data.companyName,
      p_giro_id: data.giroId,
      p_user_id: userId,
      p_username: data.username,
    }
  );

  if (companiesError) return { error: companiesError.message };

  // Validacion de giro
  const { data: giroData, error: giroError } = await supabase
    .from("giros_companies")
    .select("id")
    .eq("id", data.giroId)
    .single();

  if (giroError || !giroData) {
    throw new Error("Giro no válido");
  }

  const { data: roleTest, error: roleError } = await supabase.rpc(
    "get_my_role"
  );

  console.log("ROL ACTUAL =>", roleTest, roleError);

  return { success: true };
}
