import ClientEdit from "@/features/clients/components/ClientEdit";
import { getClientByIdService } from "@/features/others/clients/services/getClientsService";

interface ClientsEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClientsEditPage({
  params,
}: ClientsEditPageProps) {
  const { id } = await params;
  const clients = await getClientByIdService(id);
  return <ClientEdit client={clients} />;
}
