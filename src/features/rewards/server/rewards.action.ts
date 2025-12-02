"use server";
import { supabaseServer } from "@/lib/supabase/server";
import { RewardsSchema } from "../schemas/rewards.schema";

export async function rewardAction(formData: FormData) {
  const data = RewardsSchema.parse({
    rewardName: formData.get("rewardName"),
    description: formData.get("description"),
    benefitType: formData.get("benefitType"),
    benefitValue: formData.get("benefitValue"),
    requirementType: formData.get("requirementType"),
    requirementValue: formData.get("requirementValue"),
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

  const { error: userError } = await supabase.from("rewards").insert({
    company_id: profile.company_id,
    name: data.rewardName,
    description: data.description,
    benefit_type: data.benefitType,
    benefit_value: data.benefitValue,
    requirement_type: data.requirementType,
    requirement_value: data.requirementValue,
  });

  if (userError) return { error: userError.message };
  return { success: true };
}
