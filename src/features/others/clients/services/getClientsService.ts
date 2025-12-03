import { supabaseServer } from "@/lib/supabase/server";

export async function getClientsService() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("customers")
    .select("id, fullname, total_visits, phone")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
}

export async function getClientByIdService(id: string) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("customers")
    .select("id, fullname, phone,email")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data ?? [];
}
