import { supabaseServer } from "@/lib/supabase/server";

export async function getGirosService() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("giros_companies")
    .select("id, name")
    .order("name");

  if (error) throw new Error(error.message);

  return data ?? [];
}
