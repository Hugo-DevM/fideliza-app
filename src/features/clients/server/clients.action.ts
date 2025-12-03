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

export async function updateClientAction(formData: FormData) {
  const id = formData.get("id")?.toString();

  if (!id) return { error: "ID inválido" };

  const data = NewClientSchema.parse({
    fullname: formData.get("fullname"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
  });

  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "No autenticado" };

  const { data: profile } = await supabase
    .from("users")
    .select("company_id")
    .eq("id", user.id)
    .single();

  if (!profile) return { error: "No se pudo obtener el perfil" };

  const { data: updateClient, error } = await supabase
    .from("customers")
    .update({
      fullname: data.fullname,
      phone: data.phoneNumber,
      email: data.email,
    })
    .eq("id", id)
    .eq("company_id", profile.company_id)
    .select();

  if (error) return { error: error.message };

  if (!updateClient || updateClient.length === 0) {
    await supabase
      .from("customers")
      .select("id, company_id")
      .eq("id", id)
      .single();

    return {
      error: "No se encontró el cliente o no tienes permisos para actualizarlo",
    };
  }

  return { success: true };
}
