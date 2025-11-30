"use server";
import Register from "@/features/auth/components/Register";
import { getGirosService } from "@/features/others/giros/services/getGirosService";

export default async function RegisterPage() {
  const giros = await getGirosService();

  return <Register giros={giros} />;
}
