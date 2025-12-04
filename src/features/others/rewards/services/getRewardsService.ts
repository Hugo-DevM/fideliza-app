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

export async function getRewards() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("rewards")
    .select("id, name, benefit_value, requirement_type")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
}

export async function getRewardByIdService(id: string) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("rewards")
    .select(
      "id, name, description, benefit_type, benefit_value, requirement_type, requirement_value"
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data ?? [];
}
