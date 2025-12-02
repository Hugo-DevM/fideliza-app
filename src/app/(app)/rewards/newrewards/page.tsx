"use server";

import Rewards from "@/features/rewards/components/Rewards";
import {
  getBenefitsService,
  getRequirementsService,
} from "@/features/others/rewards/services/getRewardsService";

export default async function NewRewardsPage() {
  const benefits = await getBenefitsService();
  const requirements = await getRequirementsService();

  return <Rewards benefits={benefits} requirements={requirements} />;
}
