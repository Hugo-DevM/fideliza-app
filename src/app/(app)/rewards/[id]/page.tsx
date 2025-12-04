import {
  getBenefitsService,
  getRequirementsService,
  getRewardByIdService,
} from "@/features/others/rewards/services/getRewardsService";
import RewardEdit from "@/features/rewards/components/RewardEdit";

interface RewardsEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClientsEditPage({
  params,
}: RewardsEditPageProps) {
  const { id } = await params;
  const reward = await getRewardByIdService(id);
  const benefits = await getBenefitsService();
  const requirements = await getRequirementsService();

  return (
    <RewardEdit
      reward={reward}
      benefits={benefits}
      requirements={requirements}
    />
  );
}
