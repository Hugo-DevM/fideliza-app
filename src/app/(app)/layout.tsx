import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AppLayout from "./app-layout";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <AppLayout>{children}</AppLayout>;
}
