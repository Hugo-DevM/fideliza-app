"use server";

import Exchange from "@/features/home/components/Exchange";
import { getRewards } from "@/features/others/rewards/services/getRewardsService";

export default async function NewRewardsPage() {
  const rewards = await getRewards();

  return <Exchange rewards={rewards} />;
}
