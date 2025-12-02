"use server";

import Clients from "@/features/clients/components/Clients";
import { getClientsService } from "@/features/others/clients/services/getClientsService";

export default async function ClientsPage() {
  const clients = await getClientsService();
  return <Clients clients={clients} />;
}
