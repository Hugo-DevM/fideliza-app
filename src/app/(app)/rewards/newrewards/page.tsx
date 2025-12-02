"use server";

import NewRewards from "@/features/rewards/components/NewRewards";
import {
  getBenefitsService,
  getRequirementsService,
} from "@/features/others/rewards/services/getRewardsService";

export default async function NewRewardsPage() {
  const benefits = await getBenefitsService();
  const requirements = await getRequirementsService();

  return <NewRewards benefits={benefits} requirements={requirements} />;
}
