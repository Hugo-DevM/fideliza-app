import { supabaseServer } from "@/lib/supabase/server";

export async function getRequirementsService() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("requirement_types")
    .select("id, name")
    .order("id");

  if (error) throw new Error(error.message);

  return data ?? [];
}

export async function getBenefitsService() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("benefit_types")
    .select("id, name")
    .order("id");

  if (error) throw new Error(error.message);

  return data ?? [];
}
