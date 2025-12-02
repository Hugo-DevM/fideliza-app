"use server";

import { getRewards } from "@/features/others/rewards/services/getRewardsService";
import Rewards from "@/features/rewards/components/Reward";

export default async function NewRewardsPage() {
  const rewards = await getRewards();

  return <Rewards rewards={rewards} />;
}
