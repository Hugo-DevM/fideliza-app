"use server";
import { supabaseServer } from "@/lib/supabase/server";
import { NewClientSchema } from "@/features/clients/schemas/newclient.schema";

export async function newClientAction(formData: FormData) {
  const data = NewClientSchema.parse({
    fullname: formData.get("fullname"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
  });

  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("users")
    .select("company_id")
    .eq("id", user?.id)
    .single();

  if (!profile) return { error: "No se pudo obtener el perfil" };

  const { error: userError } = await supabase.from("customers").insert({
    company_id: profile.company_id,
    fullname: data.fullname,
    phone: data.phoneNumber,
    email: data.email,
  });

  if (userError) return { error: userError.message };
  return { success: true };
}
